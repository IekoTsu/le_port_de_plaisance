const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

/**
 * @module HomeRoutes
 */

/**
 * Render the home page.
 * 
 * @name RenderHomePage
 * @route {GET} /
 * @group Home - Operations about the home page
 * @returns {Object} 200 - An object containing the rendered home view
 * @returns {Object} 500 - Internal Server Error
 * 
 * @example
 * // Usage in app.js
 * app.use('/', homeRoutes);
 */
router.get('/', homeController.renderHome);

module.exports = router;
