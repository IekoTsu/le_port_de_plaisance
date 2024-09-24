const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * Catway model for MongoDB using Mongoose.
 * 
 * @module Catway
 * 
 */
/**
 * Catway schema representing a docking space (catway) for boats.
 * 
 * The schema includes the catway number, type (long or short), state of the catway, 
 * and the name of the boat associated with the catway.
 * 
 * @typedef {Object} Catway
 * @property {number} catwayNumber - Unique identifier for the catway.
 * @property {string} type - The type of the catway, either 'long' or 'short'.
 * @property {string} catwayState - Current state of the catway (e.g., 'occupied', 'available').
 * @property {string} boatName - The name of the boat assigned to this catway. Must contain at least one alphabetic letter.
 * 
 * @example
 * const exampleCatway = {
 *   catwayNumber: 101,
 *   type: 'long',
 *   catwayState: 'available',
 *   boatName: 'Serenity'
 * };
 * 
 * 
 */
const catwaySchema = new Schema({
    /**
     * The unique number identifying the catway.
     * @type {number}
     * @required
     */
    catwayNumber: {
        type: Number,
        required: true,
        unique: [true, 'ce numéro de catway existe déjà']
    },
    /**
    * The type of the catway.
    * Can either be 'long' or 'short'.
    * @type {('long' | 'short')}
    * @required
    * @trim
    */
    type: {
        type: String,
        required: true,
        enum: ['long', 'short'],
        trim: true
    },
    /**
     * The current state of the catway.
     * This can be a description like 'occupied', 'available', etc.
     * 
     * @type {string}
     * @required
     * @trim
     * @minlength 3
     * @maxlength 100
     */
    catwayState: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'L\'état du catway doit comporter au moins 3 caractères'],
        maxlength: [100, 'L\'état du Catway ne peut pas dépasser 100 caractères']
    },
    /**
     * The name of the boat currently assigned to the catway.
     * It must contain at least one alphabetic character.
     * 
     * @type {string}
     * @required
     * @trim
     * @minlength 2
     * @maxlength 50
     * @validate {validator: boatNameValidator, message: 'Boat name must contain at least one letter'}
     */
    boatName: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Le nom du bateau doit comporter au moins 2 caractères'],
        maxlength: [50, 'Le nom du bateau ne peut pas dépasser 50 caractères'],
        validate: {
            validator: function(v) {
                // Ensures the boat name is not only numbers
                return /[a-zA-Z]/.test(v); // Checks for the presence of at least one alphabetic letter
            },
            message: props => `${props.value} n'est pas valide ! Le nom du bateau doit contenir au moins une lettre.`
        }
    }
});


module.exports = mongoose.model('Catway', catwaySchema);
