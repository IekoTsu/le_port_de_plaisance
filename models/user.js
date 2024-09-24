const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

/**
 * User model for MongoDB using Mongoose.
 * 
 * This model represents users in the application, and includes validation and hashing for secure password storage.
 * 
 * @module User
 * 
 */

/**
 * User schema representing a user in the application.
 * 
 * This schema includes user details such as name, email, and hashed password. 
 * It also includes validation for these fields and automatically hashes the password before saving the user to the database.
 * 
 * @typedef {Object} User
 * @property {string} name - The full name of the user, which must contain only alphabetic characters.
 * @property {string} email - The unique email address of the user, validated against a standard email format.
 * @property {string} password - The hashed password of the user, stored securely after being hashed using bcrypt.
 * 
 * @example
 * const exampleUser = {
 *   name: 'JohnDoe',
 *   email: 'john@example.com',
 *   password: 'hashedpassword123'
 * };
 * 
 * 
 */
const userSchema = new Schema({
    /**
     * The full name of the user.
     * This field must contain only alphabetic characters.
     * 
     * @type {string}
     * @required
     * @trim
     * @minlength 3
     * @maxlength 50
     * @validate {validator: nameValidator, message: 'Name must contain only letters.'}
     * @example 'JohnDoe'
     */
    name: {
        type: String,
        trim: true,
        required: [true, 'Le nom est obligatoire'],
        minlength: [3, 'Le nom doit comporter au moins 3 caractères'],
        maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
        validate: {
            validator: function(v) {
                // Regex to ensure the name contains only letters (upper and lower case)
                return /^[A-Za-z]+$/.test(v);
            },
            message: props => `${props.value} n'est pas valide ! Le nom ne doit contenir que des lettres.`
        }
    },
    /**
     * The unique email address of the user.
     * This is validated against a standard email format.
     * 
     * @type {string}
     * @required
     * @trim
     * @unique
     * @validate {validator: emailValidator, message: 'Email is not valid.'}
     * @example 'john@example.com'
     */
    email: {
        type: String,
        unique: true,
        required: [true, 'L\'email est obligatoire'],
        trim: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} n'est pas une adresse email valide !`
        }
    },
    /**
     * The password for the user.
     * The password is hashed before being stored in the database.
     * 
     * @type {string}
     * @required
     * @trim
     * @minlength 6
     * @example 'mypassword123'
     */
    password: { 
        type: String,
        trim: true,
        required: [true, 'Le mot de passe est requis'],
        minlength: [6, 'Le mot de passe doit comporter au moins 6 caractères']
    }
}, {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
});

/**
 * Middleware that hashes the user's password before saving to the database.
 * 
 * This middleware is triggered when the password is created or modified. It uses bcrypt to hash the password.
 * 
 * @param {Function} next - The callback to move to the next middleware in the stack.
 * 
 * @example
 * const newUser = new User({
 *   name: 'JohnDoe',
 *   email: 'john@example.com',
 *   password: 'mypassword123'
 * });
 * await newUser.save(); // The password will be hashed before saving
 */
userSchema.pre('save', async function(next) {
    const user = this;

    // If the password field has not been modified, skip hashing
    if (!user.isModified('password')) {
        return next();
    }

    try {
        // Hash the password with a salt factor of 10
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema);
