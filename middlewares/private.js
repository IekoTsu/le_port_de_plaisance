const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * @module JwtMiddleware
 * 
 */

/**
 * Middleware to check if the user has a valid JWT (JSON Web Token).
 * 
 * This middleware checks the `authToken` from the user's cookies. If the token is valid,
 * the decoded user information is attached to the `req` object. If the token is invalid
 * or missing, it returns a 401 Unauthorized error.
 * 
 * @function checkJWT
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * 
 * @example
 * // Usage in a route (with the private middleware namespace)
 * const private = require('../middlewares/private');
 * 
 * app.get('/protected', private.checkJWT, (req, res) => {
 *   res.json({ message: 'This is a protected route', user: req.user });
 * });
 * 
 * @throws {401} If the token is not valid or missing.
 * @returns {void}
 */
exports.checkJWT = async (req, res, next) => {
    let token = req.cookies.authToken;

    // Strip the 'Bearer ' prefix if it exists
    if (token && token.toLowerCase().startsWith('bearer')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        // Verify the token using the SECRET_KEY
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(401).json('token_not_valid');
            } else {
                // Attach the decoded user information to the request
                req.user = decoded.user;
                next();
            }
        });
    } else {
        // No token provided - render an error page
        return res.status(401).render('error/error', { errors : ["Connectez vous pour accéder a cette page"] })
    }
};
