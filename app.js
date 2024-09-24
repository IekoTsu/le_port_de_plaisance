const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const homeRouter = require('./routes/home');
const dashboard = require('./routes/dashboard');
const userRouter = require('./routes/users');
const catwaysRoutes = require('./routes/catways');
const reservationsRoutes = require('./routes/reservations');

const mongodb = require('./db/mongo');

// Initialize MongoDB client connection
mongodb.initClientDbConnection();

const app = express();

/**
 * Main application module.
 * 
 * This module sets up the Express.js application, configures the middleware, 
 * and establishes routes for handling requests related to home, dashboard, 
 * users, catways, and reservations.
 * 
 * @module app
 * 
 * @description
 * This file serves as the main entry point to initialize the server-side application. 
 * It includes essential middleware like body parsing, CORS, cookie parsing, 
 * and session management. It also sets up the routes for handling specific 
 * API endpoints and initializes the MongoDB client connection.
 * 
 * @example
 * const app = require('./app');
 * app.listen(3000, () => {
 *   console.log('Server is running on port 3000');
 * });
 * 
 */

/**
 * Set the view engine and views directory.
 * The application uses EJS as the templating engine.
 * 
 * @returns {void}
 */
app.set('views', path.join(__dirname, 'views'));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.set('view engine', 'ejs');

/**
 * Middleware to parse JSON and URL-encoded data.
 * 
 * This is essential for parsing incoming request bodies, 
 * which can contain data in JSON or URL-encoded format.
 * 
 * @returns {void}
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Enable CORS for cross-origin resource sharing.
 * 
 * Allows the server to accept requests from different domains.
 * This is particularly useful for APIs that are consumed by 
 * front-end applications hosted on different origins.
 * 
 * @returns {void}
 */
app.use(cors());

/**
 * Middleware to override HTTP methods.
 * 
 * Allows forms to submit PUT or DELETE requests by adding 
 * a query parameter or hidden field named '_method' in forms.
 * 
 * @returns {void}
 */
app.use(methodOverride('_method'));

/**
 * Middleware for cookie parsing.
 * 
 * This middleware parses the `Cookie` header and populates 
 * `req.cookies` with an object keyed by the cookie names.
 * 
 * @returns {void}
 */
app.use(cookieParser());

/**
 * Session middleware to manage user sessions.
 * 
 * The session middleware is used to store user data 
 * across requests. It uses cookies to manage sessions.
 * 
 * @param {Object} options - Configuration options for session management.
 * @param {string} options.secret - The secret key for signing the session ID.
 * @param {boolean} options.resave - Whether to force resaving of the session.
 * @param {boolean} options.saveUninitialized - Whether to save uninitialized sessions.
 * 
 * @returns {void}
 */
app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
}));

/**
 * Home page route.
 * 
 * Handles requests for the home page.
 * 
 * @name / (home)
 * @returns {void}
 */
app.use('/', homeRouter);

/**
 * Dashboard route.
 * 
 * Handles requests for the admin dashboard.
 * 
 * @name /dashboard
 * @returns {void}
 */
app.use('/dashboard', dashboard);

/**
 * User routes.
 * 
 * Routes for managing user-related operations such as 
 * creating, updating, and deleting users.
 * 
 * @name /users
 * @returns {void}
 */
app.use('/users', userRouter);

/**
 * Catways routes.
 * 
 * Handles actions related to catways (e.g., listing, updating).
 * 
 * @name /catways
 * @returns {void}
 */
app.use('/catways', catwaysRoutes);

/**
 * Reservation routes.
 * 
 * Handles actions related to managing reservations.
 * Note: The route path might be misleading as it's currently 
 * set to '/catways'. Consider changing to '/reservations' for clarity.
 * 
 * @name /reservations
 * @returns {void}
 */
app.use('/catways', reservationsRoutes); 

module.exports = app;
