const Reservation = require('../models/reservation');

/**
 * @module ReservationsServices
 */

/**
 * Fetch all reservations for a specific catway.
 * 
 * @async
 * @function getAllCatwayReservations
 * @param {Number} catwayNumber - The number of the catway for which to fetch reservations.
 * @returns {Promise<Array>} A promise that resolves to an array of reservations for the specified catway.
 * 
 * @example
 * const reservations = await reservationService.getAllCatwayReservations(1);
 * console.log(reservations);
 */
exports.getAllCatwayReservations = async (catwayNumber) => {
    return await Reservation.find({ catwayNumber });
};

/**
 * Fetch all reservations from the database.
 * 
 * @async
 * @function getAllReservation
 * @returns {Promise<Array>} A promise that resolves to an array of all reservations.
 * 
 * @example
 * const allReservations = await reservationService.getAllReservation();
 * console.log(allReservations);
 */
exports.getAllReservation = async () => {
    return await Reservation.find();
};

/**
 * Create a new reservation in the database.
 * 
 * @async
 * @function creatReservation
 * @param {Object} reservationData - The data for the new reservation.
 * @param {Number} reservationData.catwayNumber - The number of the catway being reserved.
 * @param {String} reservationData.clientName - The name of the client making the reservation.
 * @param {String} reservationData.boatName - The name of the boat being reserved.
 * @param {Date} reservationData.checkIn - The check-in date for the reservation.
 * @param {Date} reservationData.checkOut - The check-out date for the reservation.
 * @returns {Promise<Object>} A promise that resolves to the newly created reservation object.
 * 
 * @example
 * const newReservation = await reservationService.creatReservation({
 *   catwayNumber: 1,
 *   clientName: 'John Doe',
 *   boatName: 'Seahorse',
 *   checkIn: new Date('2023-10-01T10:00:00Z'),
 *   checkOut: new Date('2023-10-02T10:00:00Z'),
 * });
 * console.log(newReservation);
 */
exports.creatReservation = async (reservationData) => {
    const newReservation = new Reservation(reservationData);
    return await newReservation.save();
};

/**
 * Fetch a specific reservation by its ID.
 * 
 * @async
 * @function getReservationById
 * @param {String} id - The ID of the reservation to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to the reservation object if found, or null if not.
 * 
 * @example
 * const reservation = await reservationService.getReservationById('60c72b2f9f1b2c001c9a9e84');
 * console.log(reservation);
 */
exports.getReservationById = async (id) => {
    return await Reservation.findById(id);
};

/**
 * Delete a reservation by its ID.
 * 
 * @async
 * @function deleteReservation
 * @param {String} id - The ID of the reservation to delete.
 * @returns {Promise<Object|null>} A promise that resolves to the deleted reservation object, or null if it doesn't exist.
 * 
 * @example
 * const deletedReservation = await reservationService.deleteReservation('60c72b2f9f1b2c001c9a9e84');
 * console.log(deletedReservation);
 */
exports.deleteReservation = async (id) => {
    return await Reservation.findByIdAndDelete({ _id: id });
};
