const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Reservation model for MongoDB using Mongoose.
 * 
 * @module Reservation
 * 
 */

/**
 * Reservation schema representing a reservation for a catway in the marina.
 * 
 * This schema includes information such as the catway number, client name, 
 * boat name, and reservation dates (check-in and check-out).
 * 
 * @typedef {Object} Reservation
 * @property {number} catwayNumber - The catway number being reserved.
 * @property {string} clientName - The name of the client making the reservation.
 * @property {string} boatName - The name of the boat associated with the reservation.
 * @property {Date} checkIn - The check-in date for the reservation, which must not be in the past.
 * @property {Date} checkOut - The check-out date for the reservation, which must be later than the check-in date.
 * 
 * @example
 * const exampleReservation = {
 *   catwayNumber: 101,
 *   clientName: 'John Doe',
 *   boatName: 'The Odyssey',
 *   checkIn: new Date('2023-09-01'),
 *   checkOut: new Date('2023-09-10')
 * };
 * 
 * 
 */
const reservationSchema = new Schema({
    /**
     * The catway number that is reserved.
     * 
     * @type {number}
     * @required
     * @example 101
     */
    catwayNumber: {
        type: Number,
        required: [true, 'Le numéro de catway est requis']
    },
    /**
     * The name of the client who made the reservation.
     * 
     * @type {string}
     * @required
     * @trim
     * @minlength 3
     * @maxlength 100
     * @example 'John Doe'
     */
    clientName: {
        type: String,
        required: [true, 'Le nom du client est obligatoire'],
        trim: true,
        minlength: [3, 'Le nom du client doit comporter au moins 3 caractères'],
        maxlength: [100, 'Le nom du client ne peut pas dépasser 100 caractères']
    },
    /**
     * The name of the boat associated with the reservation.
     * 
     * @type {string}
     * @required
     * @trim
     * @example 'The Odyssey'
     */
    boatName: {
        type: String,
        required: [true, 'Le nom du bateau est obligatoire'],
        trim: true
    },
    /**
     * The check-in date for the reservation.
     * This date must not be in the past.
     * 
     * @type {Date}
     * @required
     * @example new Date('2023-09-01')
     * @validate {validator: checkInDateValidator, message: 'Check-in date cannot be in the past'}
     */
    checkIn: {
        type: Date,
        required: [true, 'Date de check-in est obligatoire'],
        validate: {
            validator: function(v) {
                return v >= new Date(); // Ensure checkIn is not in the past
            },
            message: 'La date de check-in ne peut pas être dans le passé.'
        }
    },
    /**
     * The check-out date for the reservation.
     * This date must be later than the check-in date.
     * 
     * @type {Date}
     * @required
     * @example new Date('2023-09-10')
     * @validate {validator: checkOutDateValidator, message: 'Check-out date must be after check-in date'}
     */
    checkOut: {
        type: Date,
        required: [true, 'Date de check-out est obligatoire'],
        validate: {
            validator: function(v) {
                return v > this.checkIn; // Ensure checkOut is after checkIn
            },
            message: 'La date de check-out doit être postérieure à la date de check-in.'
        }
    }
}, {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
