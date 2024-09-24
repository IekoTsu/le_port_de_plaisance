/**
 * @module homeController
 */

/**
 * Render the home view.
 * 
 * @function renderHome
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/', homeController.renderHome);
 */
exports.renderHome = async (req, res) => {
    return res.render('home/home', { message: null });
};