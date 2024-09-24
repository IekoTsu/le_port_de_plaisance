const express = require('express');
const privateMiddleware = require('../middlewares/private');
const userController = require('../controllers/usersController');
const router = express.Router();

/**
 * @module usersRoutes
 */

/**
 * @group Users Routes - Operations related to users
 * 
 * Route to get a user by ID.
 * 
 * @name GetUserById
 * @route {GET} /:id
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Users - Operations about users
 * @param {string} id.path.required - The user's ID
 * @returns {Object} 200 - The user object
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.get('/users/:id', privateMiddleware.checkJWT, userController.getById);
 */
router.get('/:id', privateMiddleware.checkJWT, userController.getById);

/**
 * @group Users Routes - Operations related to users
 * 
 * Route to add a new user.
 * 
 * @name AddUser
 * @route {POST} /
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Users - Operations about users
 * @returns {Object} 200 - An object containing a success message
 * @returns {Object} 400 - Validation error
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.post('/users', privateMiddleware.checkJWT, userController.add);
 */
router.post('/', privateMiddleware.checkJWT, userController.add);

/**
 * @group Users Routes - Operations related to users
 * 
 * Route to render the user creation page.
 * 
 * @name RenderUserCreationPage
 * @route {GET} /user/add
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Users - Operations about users
 * @returns {Object} 200 - An object containing the rendered user creation form
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.get('/users/user/add', privateMiddleware.checkJWT, userController.renderCreationPage);
 */
router.get('/user/add', privateMiddleware.checkJWT, userController.renderCreationPage);

/**
 * @group Users Routes - Operations related to users
 * 
 * Route to delete a user by ID.
 * 
 * @name DeleteUser
 * @route {DELETE} /:id
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Users - Operations about users
 * @param {string} id.path.required - The user's ID
 * @returns {Object} 200 - An object containing a success message
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.delete('/users/:id', privateMiddleware.checkJWT, userController.delete);
 */
router.delete('/:id', privateMiddleware.checkJWT, userController.delete);

/**
 * @group Users Routes - Operations related to users
 * 
 * Route to update a user by ID.
 * 
 * @name UpdateUser
 * @route {PUT} /:id
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Users - Operations about users
 * @param {string} id.path.required - The user's ID
 * @returns {Object} 200 - An object containing a success message
 * @returns {Object} 404 - User not found
 * @returns {Object} 400 - Validation error
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.put('/users/:id', privateMiddleware.checkJWT, userController.update);
 */
router.put('/:id', privateMiddleware.checkJWT, userController.update);

/**
 * @group Users Routes - Operations related to users
 * 
 * Route to render the edit user page.
 * 
 * @name RenderEditUserPage
 * @route {GET} /:id/edit
 * @middleware {checkJWT} privateMiddleware.checkJWT
 * @group Users - Operations about users
 * @param {string} id.path.required - The user's ID
 * @returns {Object} 200 - An object containing the rendered edit user form
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.get('/users/:id/edit', privateMiddleware.checkJWT, userController.edit);
 */
router.get('/:id/edit', privateMiddleware.checkJWT, userController.edit);

/**
 * @group Users Routes - Operations related to users
 * 
 * Route to authenticate a user.
 * 
 * @name AuthenticateUser
 * @route {POST} /authenticate
 * @group Users - Operations about users
 * @returns {Object} 200 - An object containing the rendered dashboard
 * @returns {Object} 401 - Wrong credentials
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage
 * app.post('/users/authenticate', userController.authenticate);
 */
router.post('/authenticate', userController.authenticate);

module.exports = router;
