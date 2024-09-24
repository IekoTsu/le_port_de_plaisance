/**
 * @module dashboardController
 */

/**
 * Render the dashboard view.
 * 
 * @function renderDashboard
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/', private.checkJWT, dashboardController.renderDashboard);
 */
exports.renderDashboard = async (req, res) => {
    const message = req.session.message;
    delete req.session.message;

    return res.render('dashboard/dashboard', { message });
};

/**
 * Render the form to edit user details.
 * 
 * @function renderEditUserWid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/user/edit', private.checkJWT, dashboardController.renderEditUserWid);
 */
exports.renderEditUserWid = async (req, res) => {
    return res.render('dashboard/editUserWid');
};

/**
 * Render the confirmation view to delete a user.
 * 
 * @function renderDeleteUserWid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/user/delete', private.checkJWT, dashboardController.renderDeleteUserWid);
 */
exports.renderDeleteUserWid = async (req, res) => {
    return res.render('dashboard/deleteUserWid');
};

/**
 * Render the form to edit catway details.
 * 
 * @function renderEditCatwayWid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/catway/edit', private.checkJWT, dashboardController.renderEditCatwayWid);
 */
exports.renderEditCatwayWid = async (req, res) => {
    return res.render('dashboard/editCatwayWid');
};

/**
 * Render the confirmation view to delete a catway.
 * 
 * @function renderDeleteCatwayWid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/catway/delete', private.checkJWT, dashboardController.renderDeleteCatwayWid);
 */
exports.renderDeleteCatwayWid = async (req, res) => {
    return res.render('dashboard/deleteCatwayWid');
};

/**
 * Render the details view for a specific catway.
 * 
 * @function renderGetCatwayDetailsWid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/catway/details', private.checkJWT, dashboardController.renderGetCatwayDetailsWid);
 */
exports.renderGetCatwayDetailsWid = async (req, res) => {
    return res.render('dashboard/getCatwayDetailsWid');
};

/**
 * Render the details view for a specific reservation.
 * 
 * @function renderGetReservationDetailsWid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/reservation/details', private.checkJWT, dashboardController.renderGetReservationDetailsWid);
 */
exports.renderGetReservationDetailsWid = async (req, res) => {
    return res.render('dashboard/getReservationDetailsWid');
};

/**
 * Render the confirmation view to delete a reservation.
 * 
 * @function renderDeleteReservationWid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/reservation/delete', private.checkJWT, dashboardController.renderDeleteReservationWid);
 */
exports.renderDeleteReservationWid = async (req, res) => {
    return res.render('dashboard/deleteReservationWid');
};
