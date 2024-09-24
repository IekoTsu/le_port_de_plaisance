import { expect } from 'chai';
import sinon from 'sinon';
import catwayController from '../controllers/catwaysController.js';
import catwayService from '../services/catways.js';


describe('Catway Controller Tests', () => {

    let req, res, next;

    beforeEach(() => {
        req = {
            params: {},
            query: {},
            body: {},
            session: {},
        };
        res = {
            status: sinon.stub().returnsThis(),
            render: sinon.stub(),
            json: sinon.stub(),
            redirect: sinon.stub(),
        };
        next = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getAll', () => {
        it('should return 404 when no catways are found', async () => {
            sinon.stub(catwayService, 'getAllCatways').resolves([]);
            
            await catwayController.getAll(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.render.calledWith('catways/list', { catways: [], message: req.query.message + "<br>Aucun catway trouvée" })).to.be.true;
        });

        it('should return catways when they are found', async () => {
            const catways = [{ id: 1, catwayNumber: 123 }];
            sinon.stub(catwayService, 'getAllCatways').resolves(catways);

            await catwayController.getAll(req, res);

            expect(res.render.calledWith('catways/list', { catways, message: undefined })).to.be.true;
        });

        it('should handle internal server error', async () => {
            sinon.stub(catwayService, 'getAllCatways').throws(new Error('Error'));

            await catwayController.getAll(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: 'Internal Server Error', error: sinon.match.any })).to.be.true;
        });
    });

    describe('getById', () => {
        it('should return 404 if catway is not found', async () => {
            req.params.id = 'someId';
            sinon.stub(catwayService, 'getCatwayById').resolves(null);

            await catwayController.getById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.render.calledWith('error/error', { errors: ['Catway non trouvé'] })).to.be.true;
        });

        it('should return catway when found', async () => {
            req.params.id = 'someId';
            const catway = { id: 'someId', boatName: 'Boat1' };
            sinon.stub(catwayService, 'getCatwayById').resolves(catway);

            await catwayController.getById(req, res);

            expect(res.render.calledWith('catways/details', { catway })).to.be.true;
        });

        it('should handle invalid ObjectId error', async () => {
            req.params.id = 'invalidId';
            const error = new Error('Invalid Id');
            error.kind = 'ObjectId';
            sinon.stub(catwayService, 'getCatwayById').throws(error);

            await catwayController.getById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.render.calledWith('error/error', { errors: ['Entrez un identifiant valide'] })).to.be.true;
        });
    });

    describe('add', () => {
        it('should redirect after successful creation', async () => {
            req.body = { catwayNumber: 1, type: 'long', catwayState: 'good', boatName: 'Boat1' };
            const newCatway = { boatName: 'Boat1' };
            sinon.stub(catwayService, 'addCatway').resolves(newCatway);

            await catwayController.add(req, res);

            expect(res.redirect.calledWith(`/catways?message=Catway ${newCatway.boatName} a été créé avec succès`)).to.be.true;
        });

        it('should handle validation error', async () => {
            req.body = { catwayNumber: 1 };
            const error = new Error('Validation Error');
            error.name = 'ValidationError';
            error.errors = { boatName: { message: 'Boat name is required' } };
            sinon.stub(catwayService, 'addCatway').throws(error);

            await catwayController.add(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.render.calledWith('error/error', { errors: ['Boat name is required'] })).to.be.true;
        });
    });

    describe('update', () => {
        it('should update the catway and render the edit view', async () => {
            req.params.id = 'someId';
            req.body = { catwayNumber: 1, type: 'long', catwayState: 'good', boatName: 'Boat1' };
            const updatedCatway = { id: 'someId', boatName: 'Boat1' };
            sinon.stub(catwayService, 'updateCatway').resolves(updatedCatway);

            await catwayController.update(req, res);

            expect(res.render.calledWith('catways/edit', { catway: updatedCatway, message: 'Catway mis à jour avec succès' })).to.be.true;
        });

        it('should handle validation error on update', async () => {
            req.params.id = 'someId';
            req.body = { catwayNumber: 1 };
            const error = new Error('Validation Error');
            error.name = 'ValidationError';
            error.errors = { boatName: { message: 'Boat name is required' } };
            sinon.stub(catwayService, 'updateCatway').throws(error);

            await catwayController.update(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.render.calledWith('error/error', { errors: ['Boat name is required'] })).to.be.true;
        });
    });

    describe('delete', () => {
        it('should delete the catway and return success message', async () => {
            req.params.id = 'someId';
            const deletedCatway = { boatName: 'Boat1' };
            sinon.stub(catwayService, 'deleteCatway').resolves(deletedCatway);
            req.session = {};
            req.headers = {referer: '/other'}

            await catwayController.delete(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.redirect.calledWith(`/catways?message=${req.session.message}`)).to.be.true;
        });

        it('should handle invalid ObjectId on delete', async () => {
            req.params.id = 'invalidId';
            const error = new Error('Invalid Id');
            error.kind = 'ObjectId';
            sinon.stub(catwayService, 'deleteCatway').throws(error); 

            await catwayController.delete(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ errorKind: 'ObjectId' })).to.be.true;
        });
    });

    describe('renderAddforum', () => {
        it('should render the add forum page', async () => {
            await catwayController.renderAddforum(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.render.calledWith('catways/add')).to.be.true;
        });
    });

    describe('edit', () => {
        it('should render the edit page for a catway', async () => {
            req.params.id = 'someId';
            const catway = { id: 'someId', boatName: 'Boat1' };
            sinon.stub(catwayService, 'getCatwayById').resolves(catway);

            await catwayController.edit(req, res);

            expect(res.render.calledWith('catways/edit', { catway })).to.be.true;
        });

        it('should handle invalid ObjectId on edit', async () => {
            req.params.id = 'invalidId';
            const error = new Error('Invalid Id');
            error.kind = 'ObjectId';
            sinon.stub(catwayService, 'getCatwayById').throws(error);

            await catwayController.edit(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.render.calledWith('error/error', { errors: ['Entrez un identifiant valide'] })).to.be.true;
        });
    });
});
