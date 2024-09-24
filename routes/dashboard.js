const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const privateMiddleware = require('../middlewares/private');

/**
 * @module DashboardRoutes
 */

/**
 * @group Dashboard Routes - Operations related to the dashboard
 * 
 * Render the dashboard.
 * 
 * @name RenderDashboard
 * @route {GET} /
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Dashboard - Operations related to the dashboard
 * @returns {Object} 200 - The rendered dashboard view
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/dashboard', privateMiddleware.checkJWT, dashboardController.renderDashboard);
 */
router.get('/', privateMiddleware.checkJWT, dashboardController.renderDashboard);

/**
 * Render the edit user widget.
 * 
 * @name RenderEditUserWidget
 * @route {GET} /user/edit
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Dashboard - Operations related to the dashboard
 * @returns {Object} 200 - The rendered edit user view
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/dashboard/user/edit', privateMiddleware.checkJWT, dashboardController.renderEditUserWid);
 */
router.get('/user/edit', privateMiddleware.checkJWT, dashboardController.renderEditUserWid);

/**
 * Render the delete user widget.
 * 
 * @name RenderDeleteUserWidget
 * @route {GET} /user/delete
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Dashboard - Operations related to the dashboard
 * @returns {Object} 200 - The rendered delete user view
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/dashboard/user/delete', privateMiddleware.checkJWT, dashboardController.renderDeleteUserWid);
 */
router.get('/user/delete', privateMiddleware.checkJWT, dashboardController.renderDeleteUserWid);

/**
 * Render the edit catway widget.
 * 
 * @name RenderEditCatwayWidget
 * @route {GET} /catway/edit
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Dashboard - Operations related to the dashboard
 * @returns {Object} 200 - The rendered edit catway view
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/dashboard/catway/edit', privateMiddleware.checkJWT, dashboardController.renderEditCatwayWid);
 */
router.get('/catway/edit', privateMiddleware.checkJWT, dashboardController.renderEditCatwayWid);

/**
 * Render the delete catway widget.
 * 
 * @name RenderDeleteCatwayWidget
 * @route {GET} /catway/delete
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Dashboard - Operations related to the dashboard
 * @returns {Object} 200 - The rendered delete catway view
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/dashboard/catway/delete', privateMiddleware.checkJWT, dashboardController.renderDeleteCatwayWid);
 */
router.get('/catway/delete', privateMiddleware.checkJWT, dashboardController.renderDeleteCatwayWid);

/**
 * Render the catway details widget.
 * 
 * @name RenderCatwayDetailsWidget
 * @route {GET} /catway/details
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Dashboard - Operations related to the dashboard
 * @returns {Object} 200 - The rendered catway details view
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/dashboard/catway/details', privateMiddleware.checkJWT, dashboardController.renderGetCatwayDetailsWid);
 */
router.get('/catway/details', privateMiddleware.checkJWT, dashboardController.renderGetCatwayDetailsWid);

/**
 * Render the reservation details widget.
 * 
 * @name RenderReservationDetailsWidget
 * @route {GET} /reservation/details
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Dashboard - Operations related to the dashboard
 * @returns {Object} 200 - The rendered reservation details view
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/dashboard/reservation/details', privateMiddleware.checkJWT, dashboardController.renderGetReservationDetailsWid);
 */
router.get('/reservation/details', privateMiddleware.checkJWT, dashboardController.renderGetReservationDetailsWid);

/**
 * Render the delete reservation widget.
 * 
 * @name RenderDeleteReservationWidget
 * @route {GET} /reservation/delete
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Dashboard - Operations related to the dashboard
 * @returns {Object} 200 - The rendered delete reservation view
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/dashboard/reservation/delete', privateMiddleware.checkJWT, dashboardController.renderDeleteReservationWid);
 */
router.get('/reservation/delete', privateMiddleware.checkJWT, dashboardController.renderDeleteReservationWid);

module.exports = router;
