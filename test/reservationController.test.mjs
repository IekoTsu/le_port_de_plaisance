import { expect } from 'chai';
import sinon from 'sinon';
import reservationsController from '../controllers/reservationsController.js';
import reservationService from '../services/reservations.js';
import catwayService from '../services/catways.js';

describe('Reservations Controller Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            session: {},
        };
        res = {
            status: sinon.stub().returnsThis(),
            render: sinon.stub(),
            json: sinon.stub(),
            redirect: sinon.stub()
        };
        next = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getAllOfCatway', () => {
        it('should return 404 if catway is not found', async () => {
            req.params.id = 'invalid_id';
            sinon.stub(catwayService, 'getCatwayById').resolves(null);

            await reservationsController.getAllOfCatway(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'Catway non trouvé' })).to.be.true;
        });

        it('should return 404 if no reservations are found', async () => {
            req.params.id = 'valid_id';
            const catway = { catwayNumber: '123' };
            sinon.stub(catwayService, 'getCatwayById').resolves(catway);
            sinon.stub(reservationService, 'getAllCatwayReservations').resolves([]);

            await reservationsController.getAllOfCatway(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'Aucune réservation trouvée' })).to.be.true;
        });

        it('should return reservations if found', async () => {
            req.params.id = 'valid_id';
            const catway = { catwayNumber: '123' };
            const reservations = [{ id: 1, boatName: 'Boat 1' }];
            sinon.stub(catwayService, 'getCatwayById').resolves(catway);
            sinon.stub(reservationService, 'getAllCatwayReservations').resolves(reservations);

            await reservationsController.getAllOfCatway(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(reservations)).to.be.true;
        });

        it('should handle internal server error', async () => {
            req.params.id = 'valid_id';
            sinon.stub(catwayService, 'getCatwayById').throws(new Error('Error'));

            await reservationsController.getAllOfCatway(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: 'Internal Server Error', error: sinon.match.any })).to.be.true;
        });
    });

    describe('getAll', () => {
        it('should render reservations list', async () => {
            const reservations = [{ id: 1, boatName: 'Boat 1' }];
            sinon.stub(reservationService, 'getAllReservation').resolves(reservations);

            await reservationsController.getAll(req, res);

            expect(res.render.calledWith('reservations/list', { reservations })).to.be.true;
        });

        it('should handle internal server error', async () => {
            sinon.stub(reservationService, 'getAllReservation').throws(new Error('Error'));

            await reservationsController.getAll(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: 'Internal Server Error', error: sinon.match.any })).to.be.true;
        });
    });

    describe('getbyId', () => {
        it('should return 404 if reservation is not found', async () => {
            req.params.idReservation = 'invalid_id';
            sinon.stub(reservationService, 'getReservationById').resolves(null);

            await reservationsController.getbyId(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.render.calledWith('error/error', { errors: ['Réservation non trouvée'] })).to.be.true;
        });

        it('should render reservation details if found', async () => {
            req.params.idReservation = 'valid_id';
            const reservation = { id: 'valid_id', boatName: 'Boat 1' };
            sinon.stub(reservationService, 'getReservationById').resolves(reservation);

            await reservationsController.getbyId(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.render.calledWith('reservations/details', { reservation })).to.be.true;
        });

        it('should handle invalid ObjectId error', async () => {
            req.params.idReservation = 'invalid_id';
            const error = new Error('Invalid Id');
            error.kind = 'ObjectId';
            sinon.stub(reservationService, 'getReservationById').throws(error);

            await reservationsController.getbyId(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.render.calledWith('error/error', { errors: ['Entrez un identifiant valide'] })).to.be.true;
        });

        it('should handle internal server error', async () => {
            req.params.idReservation = 'valid_id';
            sinon.stub(reservationService, 'getReservationById').throws(new Error('Error'));

            await reservationsController.getbyId(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: 'Internal Server Error', error: sinon.match.any })).to.be.true;
        });
    });

    describe('add', () => {
        it('should return 404 if catway is not found', async () => {
            req.params.id = 'invalid_id';
            req.body = { clientName: 'John Doe', checkIn: '2023-01-01', checkOut: '2023-01-02' };
            sinon.stub(catwayService, 'getCatwayById').resolves(null);

            await reservationsController.add(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'Catway non trouvé' })).to.be.true;
        });

        it('should create reservation and render success message', async () => {
            req.params.id = 'valid_id';
            req.body = { clientName: 'John Doe', checkIn: '2023-01-01', checkOut: '2023-01-02' };
            const catway = { catwayNumber: '123', boatName: 'Boat 1' };
            const reservation = { boatName: 'Boat 1' };

            sinon.stub(catwayService, 'getCatwayById').resolves(catway);
            sinon.stub(reservationService, 'creatReservation').resolves(reservation);

            await reservationsController.add(req, res);

            expect(res.render.calledWith('dashboard/dashboard', {message : `La réservation du bateau ${reservation.boatName} a été créée avec succès`})).to.be.true;
        });

        it('should handle validation error', async () => {
            req.params.id = 'valid_id';
            req.body = { clientName: 'John Doe' }; // Missing required fields
            const catway = { catwayNumber: '123', boatName: 'Boat 1' };
            const error = new Error('Validation Error');
            error.name = 'ValidationError';
            error.errors = { checkIn: { message: 'Check-in date is required' } };
            sinon.stub(catwayService, 'getCatwayById').resolves(catway);
            sinon.stub(reservationService, 'creatReservation').throws(error);

            await reservationsController.add(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.render.calledWith('error/error', { errors: ['Check-in date is required'] })).to.be.true;
        });

        it('should handle internal server error', async () => {
            req.params.id = 'valid_id';
            req.body = { clientName: 'John Doe', checkIn: '2023-01-01', checkOut: '2023-01-02' };
            sinon.stub(catwayService, 'getCatwayById').resolves({ catwayNumber: '123', boatName: 'Boat 1' });
            sinon.stub(reservationService, 'creatReservation').throws(new Error('Error'));

            await reservationsController.add(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: 'Internal Server Error', error: sinon.match.any })).to.be.true;
        });
    });

    describe('renderAddForm', () => {
        it('should render the add form page', async () => {
            const catways = [{ id: '1', catwayNumber: '123' }];
            sinon.stub(catwayService, 'getAllCatways').resolves(catways);

            await reservationsController.renderAddForm(req, res);

            expect(res.render.calledWith('reservations/add', { catways })).to.be.true;
        });

        it('should return 404 if no catways are found', async () => {
            sinon.stub(catwayService, 'getAllCatways').resolves([]);

            await reservationsController.renderAddForm(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.render.calledWith('catways/list', { catways: [], message: 'Aucun catway trouvé' })).to.be.true;
        });

        it('should handle internal server error', async () => {
            sinon.stub(catwayService, 'getAllCatways').throws(new Error('Error'));

            await reservationsController.renderAddForm(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: 'Internal Server Error', error: sinon.match.any })).to.be.true;
        });
    });

    describe('delete', () => {
        it('should delete the reservation and return success message', async () => {
            req.params.idReservation = 'valid_id';
            const deletedReservation = { boatName: 'Boat 1', checkIn: '2023-01-01' };
            sinon.stub(reservationService, 'deleteReservation').resolves(deletedReservation);
            req.session = {};
            req.headers = {referer: '/other'}

            await reservationsController.delete(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.redirect.calledWith(`/dashboard?message=${req.session.message}`)).to.be.true;
        });

        it('should handle invalid ObjectId on delete', async () => {
            req.params.idReservation = 'invalid_id';
            const error = new Error('Invalid Id');
            error.kind = 'ObjectId';
            sinon.stub(reservationService, 'deleteReservation').throws(error);

            await reservationsController.delete(req, res);

            expect(res.status.calledWith(400)).to.be.true; 
            expect(res.json.calledWith({ errorKind: 'ObjectId' })).to.be.true;
        });

        it('should handle internal server error', async () => {
            req.params.idReservation = 'valid_id';
            sinon.stub(reservationService, 'deleteReservation').throws(new Error('Error'));

            await reservationsController.delete(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: 'Internal Server Error', error: sinon.match.any })).to.be.true;
        });
    });
});
