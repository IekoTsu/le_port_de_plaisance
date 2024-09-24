const catwayService = require('../services/catways');

/**
 * @module catwaysController
 */

/**
 * Get all catways and render the list view.
 * 
 * @function getAll
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/', private.checkJWT, controller.getAll);
 */
exports.getAll = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        const message = req.query.message;
        
        if (!catways || catways.length === 0) {
            return res.status(404).render('catways/list', { catways: [], message: message + "<br>Aucun catway trouvée" });
        }
        
        return res.render('catways/list', { catways, message });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Get a catway by ID and render the details view.
 * 
 * @function getById
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/:id', private.checkJWT, controller.getById);
 */
exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const catway = await catwayService.getCatwayById(id);

        if (!catway) {
            return res.status(404).render('error/error', { errors: ['Catway non trouvé'] });
        }
        
        return res.status(200).render('catways/details', { catway });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).render('error/error', { errors: ['Entrez un identifiant valide'] });
        }

        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Add a new catway and redirect to the list view.
 * 
 * @function add
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.post('/', private.checkJWT, controller.add);
 */
exports.add = async (req, res) => {
    const catwayData = {
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState,
        boatName: req.body.boatName
    };

    try {
        const newCatway = await catwayService.addCatway(catwayData);
        return res.redirect(`/catways?message=Catway ${newCatway.boatName} a été créé avec succès`);
    } catch (error) {
        // Check if the error is a Mongoose validation error
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).render('error/error', { errors });

        // Handle duplicate key error 
        } else if (error.code === 11000){
            // Mongoose uses code 11000 for duplicate key errors
            return res.status(400).render('error/error', { errors : ['Ce numéro de catway existe déjà'] });
        }

        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Render the form to add a new catway.
 * 
 * @function renderAddforum
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void} 
 * 
 * @example
 * // Usage in route
 * router.get('/add', private.checkJWT, controller.renderAddforum);
 */
exports.renderAddforum = async (req, res) => {
    try {
        return res.status(200).render('catways/add');
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Update an existing catway and render the edit view.
 * 
 * @function update
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.put('/:id', private.checkJWT, controller.update);
 */
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedCatway = await catwayService.updateCatway(id, req.body);

        if (!updatedCatway) {
            return res.status(404).json('Catway non trouvé');
        }

        return res.status(200).render('catways/edit', { catway: updatedCatway, message: 'Catway mis à jour avec succès' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).render('error/error', { errors });
        }

        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Render the form to edit an existing catway.
 * 
 * @function edit
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/:id/edit', private.checkJWT, controller.edit);
 */
exports.edit = async (req, res) => {
    const id = req.params.id;

    try {
        const catway = await catwayService.getCatwayById(id);

        if (!catway) {
            return res.status(404).render('error/error', { errors: ['Catway non trouvé'] });
        }

        return res.render('catways/edit', { catway });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).render('error/error', { errors: ['Entrez un identifiant valide'] });
        }
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Delete a catway by ID and redirect to the list view.
 * 
 * @function delete
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.delete('/:id', private.checkJWT, controller.delete);
 */
exports.delete = async (req, res) => {
    const id = req.params.id;
    
    try {
        const catway = await catwayService.deleteCatway(id);
        
        req.session.message = `Catway ${catway.boatName} a été supprimé avec succès`;

        console.log(req);
        
        
        
        if (req.headers.referer.includes('dashboard')) {
            return res.status(200).json({ message: req.session.message });
        }
        

        return res.status(200).redirect(`/catways?message=${req.session.message}`);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorKind: error.kind });
        }
        
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};
