const User = require('../models/user');

/**
 * @module UsersServices
 */

/**
 * Add a new user to the database.
 * 
 * @async
 * @function addUser
 * @param {Object} userData - The data for the new user.
 * @param {String} userData.name - The name of the user.
 * @param {String} userData.email - The email of the user.
 * @param {String} userData.password - The password for the user account.
 * @returns {Promise<Object>} A promise that resolves to the newly created user object.
 * 
 * @example
 * const newUser = await userService.addUser({
 *   name: 'Alice Smith',
 *   email: 'alice@example.com',
 *   password: 'securepassword',
 * });
 * console.log(newUser);
 */
exports.addUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

/**
 * Find a user by their ID.
 * 
 * @async
 * @function findUserById
 * @param {String} id - The ID of the user to find.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not.
 * 
 * @example
 * const user = await userService.findUserById('60c72b2f9f1b2c001c9a9e84');
 * console.log(user);
 */
exports.findUserById = async (id) => {
    return await User.findById(id);
};

/**
 * Update an existing user by their ID.
 * 
 * @async
 * @function updateUser
 * @param {String} id - The ID of the user to update.
 * @param {Object} updateData - The data to update in the user.
 * @returns {Promise<Object|null>} A promise that resolves to the updated user object, or null if the user doesn't exist.
 * 
 * @example
 * const updatedUser = await userService.updateUser('60c72b2f9f1b2c001c9a9e84', { name: 'Alice Johnson' });
 * console.log(updatedUser);
 */
exports.updateUser = async (id, updateData) => {
    return await User.findByIdAndUpdate(
        { _id: id }, 
        updateData, 
        { 
            new: true,            // Return the updated document
            runValidators: true,  // Ensure schema validators are run
            context: 'query'      // Ensure proper context for custom validators
        }
    );
};

/**
 * Delete a user by their ID.
 * 
 * @async
 * @function deleteUser
 * @param {String} id - The ID of the user to delete.
 * @returns {Promise<Object|null>} A promise that resolves to the deleted user object, or null if it doesn't exist.
 * 
 * @example
 * const deletedUser = await userService.deleteUser('60c72b2f9f1b2c001c9a9e84');
 * console.log(deletedUser);
 */
exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete({ _id: id });
};
