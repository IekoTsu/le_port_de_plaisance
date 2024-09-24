const catwayService = require('../services/catways');
const reservationService = require('../services/reservations');

/**
 * @module reservationsController
 */

/**
 * Get all reservations for a specific catway by ID.
 * 
 * @function getAllOfCatway
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/:id/reservations', private.checkJWT, controller.getAllOfCatway);
 */
exports.getAllOfCatway = async (req, res) => {
    const catwayId = req.params.id;

    try {
        const catway = await catwayService.getCatwayById(catwayId);

        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        const reservations = await reservationService.getAllCatwayReservations(catway.catwayNumber);

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: 'Aucune réservation trouvée' });
        }
        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Get all reservations and render the list view.
 * 
 * @function getAll
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/reservations/list', private.checkJWT, controller.getAll);
 */
exports.getAll = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservation();
        return res.render('reservations/list', { reservations });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Get a reservation by ID and render the details view.
 * 
 * @function getbyId
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/:id/reservations/:idReservation', private.checkJWT, controller.getbyId);
 */
exports.getbyId = async (req, res) => {
    const reservationId = req.params.idReservation;

    try {
        const reservation = await reservationService.getReservationById(reservationId);

        if (!reservation) {
            return res.status(404).render('error/error', { errors: ['Réservation non trouvée'] });
        }
        return res.status(200).render('reservations/details', { reservation });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).render('error/error', { errors: ['Entrez un identifiant valide'] });
        }
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Add a new reservation and redirect to the dashboard.
 * 
 * @function add
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.post('/:id/reservations', private.checkJWT, controller.add);
 */
exports.add = async (req, res) => {
    const catwayId = req.params.id;

    try {
        const catway = await catwayService.getCatwayById(catwayId);

        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        const reservationData = {
            catwayNumber: catway.catwayNumber,
            clientName: req.body.clientName,
            boatName: catway.boatName,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
        };

        const reservation = await reservationService.creatReservation(reservationData);
        return res.render('dashboard/dashboard', { message: `La réservation du bateau ${reservation.boatName} a été créée avec succès` });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).render('error/error', { errors });
        }
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Render the form to add a new reservation.
 * 
 * @function renderAddForm
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/reservation/add', private.checkJWT, controller.renderAddForm);
 */
exports.renderAddForm = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();

        if (!catways || catways.length === 0) {
            return res.status(404).render('catways/list', { catways: [], message: 'Aucun catway trouvé' });
        }
        return res.render('reservations/add', { catways });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Delete a reservation by ID and redirect to the dashboard.
 * 
 * @function delete
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.delete('/:id/reservations/:idReservation', private.checkJWT, controller.delete);
 */
exports.delete = async (req, res) => {
    const idReservation = req.params.idReservation;
    
    try {
        const reservation = await reservationService.deleteReservation(idReservation);
        req.session.message = `La réservation du bateau ${reservation.boatName}, le ${reservation.checkIn} a été supprimée avec succès`;

        if (req.headers.referer.includes('dashboard')) {
            return res.status(200).json({ message: req.session.message });
        }

        return res.status(200).redirect(`/dashboard?message=${req.session.message}`);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorKind: error.kind });
        }
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};
 