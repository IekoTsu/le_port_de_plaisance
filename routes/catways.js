const express = require('express');
const router = express.Router();
const controller = require('../controllers/catwaysController');
const privateMiddleware = require('../middlewares/private');

/**
 * @module CatwaysRoutes
 */

/**
 * @group Catway Routes - Operations related to catways
 * 
 * Get all catways.
 * 
 * @name GetAllCatways
 * @route {GET} /catways
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Catways - Operations related to catways
 * @returns {Object} 200 - An array of catways
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/catways', privateMiddleware.checkJWT, controller.getAll);
 */
router.get('/', privateMiddleware.checkJWT, controller.getAll);

/**
 * Render the form to add a new catway.
 * 
 * @name RenderAddCatway
 * @route {GET} /catways/add
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Catways - Operations related to catways
 * @returns {Object} 200 - The add catway form
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/catways/add', privateMiddleware.checkJWT, controller.renderAddforum);
 */
router.get('/add', privateMiddleware.checkJWT, controller.renderAddforum);

/**
 * Get a specific catway by ID.
 * 
 * @name GetCatwayById
 * @route {GET} /catways/:id
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Catways - Operations related to catways
 * @param {string} id.path.required - The catway ID
 * @returns {Object} 200 - The catway details
 * @returns {Object} 404 - Catway not found
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/catways/:id', privateMiddleware.checkJWT, controller.getById);
 */
router.get('/:id', privateMiddleware.checkJWT, controller.getById);

/**
 * Add a new catway.
 * 
 * @name AddCatway
 * @route {POST} /catways
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Catways - Operations related to catways
 * @param {Catway.model} catway.body.required - The new catway details
 * @returns {Object} 302 - Redirects to catways list on success
 * @returns {Object} 400 - Validation error
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.post('/catways', privateMiddleware.checkJWT, controller.add);
 */
router.post('/', privateMiddleware.checkJWT, controller.add);

/**
 * Update an existing catway by ID.
 * 
 * @name UpdateCatway
 * @route {PUT} /catways/:id
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Catways - Operations related to catways
 * @param {string} id.path.required - The catway ID
 * @param {Catway.model} catway.body.required - The updated catway details
 * @returns {Object} 200 - The updated catway
 * @returns {Object} 404 - Catway not found
 * @returns {Object} 400 - Validation error
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.put('/catways/:id', privateMiddleware.checkJWT, controller.update);
 */
router.put('/:id', privateMiddleware.checkJWT, controller.update);

/**
 * Render the form to edit an existing catway.
 * 
 * @name EditCatway
 * @route {GET} /catways/:id/edit
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Catways - Operations related to catways
 * @param {string} id.path.required - The catway ID
 * @returns {Object} 200 - The edit catway form
 * @returns {Object} 404 - Catway not found
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.get('/catways/:id/edit', privateMiddleware.checkJWT, controller.edit);
 */
router.get('/:id/edit', privateMiddleware.checkJWT, controller.edit);

/**
 * Delete a catway by ID.
 * 
 * @name DeleteCatway
 * @route {DELETE} /catways/:id
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Catways - Operations related to catways
 * @param {string} id.path.required - The catway ID
 * @returns {Object} 200 - Confirmation message on success
 * @returns {Object} 404 - Catway not found
 * @returns {Object} 401 - Unauthorized if no valid token
 * 
 * @example
 * // Usage
 * app.delete('/catways/:id', privateMiddleware.checkJWT, controller.delete);
 */
router.delete('/:id', privateMiddleware.checkJWT, controller.delete);

module.exports = router;
