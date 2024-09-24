const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationsController');
const privateMiddleware = require('../middlewares/private');

/**
 * @module ReservationsRoutes
 */

/**
 * Get all reservations for a specific catway.
 * 
 * @name GetAllReservations
 * @route {GET} /:id/reservations
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - The catway ID
 * @returns {Object} 200 - An array of reservations
 * @returns {Object} 404 - Catway not found
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.get('/:id/reservations', privateMiddleware.checkJWT, controller.getAllOfCatway);
 */
router.get('/:id/reservations', privateMiddleware.checkJWT, controller.getAllOfCatway);

/**
 * Get all reservations and render the list view.
 * 
 * @name GetAllReservationsList
 * @route {GET} /reservations/list
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Reservations - Operations about reservations
 * @returns {Object} 200 - An object containing the rendered reservations list view
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.get('/reservations/list', privateMiddleware.checkJWT, controller.getAll);
 */
router.get('/reservations/list', privateMiddleware.checkJWT, controller.getAll);

/**
 * Get a reservation by ID and render the details view.
 * 
 * @name GetReservationById
 * @route {GET} /:id/reservations/:idReservation
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - The catway ID
 * @param {string} idReservation.path.required - The reservation ID
 * @returns {Object} 200 - An object containing the rendered reservation details view
 * @returns {Object} 404 - Reservation not found
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.get('/:id/reservations/:idReservation', privateMiddleware.checkJWT, controller.getbyId);
 */
router.get('/:id/reservations/:idReservation', privateMiddleware.checkJWT, controller.getbyId);

/**
 * Add a new reservation.
 * 
 * @name AddReservation
 * @route {POST} /:id/reservations
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - The catway ID
 * @returns {Object} 200 - An object containing a success message
 * @returns {Object} 404 - Catway not found
 * @returns {Object} 400 - Validation error
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.post('/:id/reservations', privateMiddleware.checkJWT, controller.add);
 */
router.post('/:id/reservations', privateMiddleware.checkJWT, controller.add);

/**
 * Render the form for adding a new reservation.
 * 
 * @name RenderAddReservationForm
 * @route {GET} /reservation/add
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Reservations - Operations about reservations
 * @returns {Object} 200 - An object containing the rendered add reservation form
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.get('/reservation/add', privateMiddleware.checkJWT, controller.renderAddForm);
 */
router.get('/reservation/add', privateMiddleware.checkJWT, controller.renderAddForm);

/**
 * Delete a reservation by ID.
 * 
 * @name DeleteReservation
 * @route {DELETE} /:id/reservations/:idReservation
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - The catway ID
 * @param {string} idReservation.path.required - The reservation ID
 * @returns {Object} 200 - An object containing a success message
 * @returns {Object} 404 - Reservation not found
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.delete('/:id/reservations/:idReservation', privateMiddleware.checkJWT, controller.delete);
 */
router.delete('/:id/reservations/:idReservation', privateMiddleware.checkJWT, controller.delete);

module.exports = router;
