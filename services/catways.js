const Catway = require('../models/catway');

/**
 * @module CatwaysServices
 */

/**
 * Fetch all catways from the database.
 * 
 * @async
 * @function getAllCatways
 * @returns {Promise<Array>} A promise that resolves to an array of all catways.
 * 
 * @example
 * const catways = await catwayService.getAllCatways();
 * console.log(catways);
 */
exports.getAllCatways = async () => {
    return await Catway.find();
};

/**
 * Fetch a specific catway by its ID.
 * 
 * @async
 * @function getCatwayById
 * @param {String} id - The ID of the catway to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to the catway object if found, or null if not.
 * 
 * @example
 * const catway = await catwayService.getCatwayById('60c72b2f9f1b2c001c9a9e84');
 * console.log(catway);
 */
exports.getCatwayById = async (id) => {
    return await Catway.findById(id);
};

/**
 * Add a new catway to the database.
 * 
 * @async
 * @function addCatway
 * @param {Object} catwayData - The data of the new catway to be created.
 * @param {Number} catwayData.catwayNumber - The number identifying the catway.
 * @param {String} catwayData.type - The type of catway ('long' or 'short').
 * @param {String} catwayData.catwayState - The current state of the catway.
 * @param {String} catwayData.boatName - The name of the boat assigned to the catway.
 * @returns {Promise<Object>} A promise that resolves to the newly created catway object.
 * 
 * @example
 * const newCatway = await catwayService.addCatway({ catwayNumber: 1, type: 'long', catwayState: 'available', boatName: 'Poseidon' });
 * console.log(newCatway);
 */
exports.addCatway = async (catwayData) => {
    const newCatway = new Catway(catwayData);
    return await newCatway.save();
};

/**
 * Update an existing catway by its ID.
 * 
 * @async
 * @function updateCatway
 * @param {String} id - The ID of the catway to update.
 * @param {Object} updateData - The data to update in the catway.
 * @returns {Promise<Object|null>} A promise that resolves to the updated catway object, or null if the catway doesn't exist.
 * 
 * @example
 * const updatedCatway = await catwayService.updateCatway('60c72b2f9f1b2c001c9a9e84', { catwayState: 'occupied' });
 * console.log(updatedCatway);
 */
exports.updateCatway = async (id, updateData) => {
    return await Catway.findByIdAndUpdate(
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
 * Delete a catway by its ID.
 * 
 * @async
 * @function deleteCatway
 * @param {String} id - The ID of the catway to delete.
 * @returns {Promise<Object|null>} A promise that resolves to the deleted catway object, or null if the catway doesn't exist.
 * 
 * @example
 * const deletedCatway = await catwayService.deleteCatway('60c72b2f9f1b2c001c9a9e84');
 * console.log(deletedCatway);
 */
exports.deleteCatway = async (id) => {
    return await Catway.findByIdAndDelete({ _id: id });
};
