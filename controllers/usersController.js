const userService = require('../services/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * @module usersController
 */

/**
 * Get a user by ID.
 * 
 * @function getById
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/:id', private.checkJWT, userController.getById);
 */
exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userService.findUserById(id);
        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Add a new user and render the dashboard.
 * 
 * @function add
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.post('/', private.checkJWT, userController.add);
 */
exports.add = async (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    try {
        let user = await userService.addUser(userData);
        return res.render('dashboard/dashboard', { message: `L'utilisateur ${user.name}a été créé avec succès` });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).render('error/error', { errors });
        } else if (error.code === 11000) {
            return res.status(400).render('error/error', { errors: ["Cet email existe déjà dans notre base de données"] });
        }

        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * Render the user creation page.
 * 
 * @function renderCreationPage
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/user/add', private.checkJWT, userController.renderCreationPage);
 */
exports.renderCreationPage = async (req, res) => {
    res.render('users/create_user');
};

/**
 * Update a user by ID and render the edit page.
 * 
 * @function update
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.put('/:id', private.checkJWT, userController.update);
 */
exports.update = async (req, res) => {
    const id = req.params.id;

    const updateData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const user = await userService.findUserById(id);

        if (user) {
            Object.keys(updateData).forEach((key) => {
                if (!!updateData[key]) {
                    user[key] = updateData[key];
                }
            });
            await user.save();
            return res.status(200).render('users/edit_user', { user, message: 'L\'utilisateur a été mis à jour avec succès' });
        }

        return res.status(404).json('Utilisateur non trouvé');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).render('error/error', { errors });
        }

        return res.status(501).json(error);
    }
};

/**
 * Render the edit user page for a specific user by ID.
 * 
 * @function edit
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/:id/edit', private.checkJWT, userController.edit);
 */
exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userService.findUserById(id);

        if (!user) {
            return res.status(404).render('error/error', { errors: ['Utilisateur non trouvé'] });
        }

        return res.render('users/edit_user', { user, message: null });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).render('error/error', { errors: ['Entrez un identifiant valide'] });
        }

        return res.status(501).json(error);
    }
};

/**
 * Delete a user by ID.
 * 
 * @function delete
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.delete('/:id', private.checkJWT, userController.delete);
 */
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userService.deleteUser(id);

        return res.render('dashboard/dashboard', { message: `L'utilisateur ${user.name} a été supprimé avec succès` });
    } catch (error) {

        if (error.kind === "ObjectId") {
            return res.status(400).json({ errorKind: error.kind });
        }

        return res.status(501).json(error);
    }
};

/**
 * Authenticate a user and render the dashboard.
 * 
 * @function authenticate
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.post('/authenticate', userController.authenticate);
 */
exports.authenticate = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email }, '-__v -createdAt -updatedAt');

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({ user: user }, SECRET_KEY, { expiresIn: expireIn });

                    res.cookie('authToken', token, { httpOnly: true, maxAge: expireIn * 1000 });
                    return res.render('dashboard/dashboard');
                }

                if (err) {
                    throw new Error(err);
                }

                return res.render('home/home', { message: 'mot de passe erroné, veuillez réessayer.' }); 
            });
        } else {
            return res.render('home/home', { message: 'Identifiants erronés, veuillez réessayer.' });
        }
    } catch (error) {
        return res.status(501).json(error);
    }
};

/**
 * Fetch and display a list of all users.
 * 
 * @async
 * @function getUsersList
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/list', userController.getUsersList);
 */
exports.getUsersList = async (req, res) =>  {   
    try {
        const users = await userService.getAllUsers();
        
        if (!users || users.length === 0){
            return res.status(404).render('dashboard/dashboard', { message: `Aucun utilisateur trouvé` });
        }

        return res.render('users/list_users', { users : users })
    } catch (error) {
        return res.status(501).json(error);
    }
}