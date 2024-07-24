const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../app');
const Policy = require('../../models/Policy');
const { CustomError } = require('../../errorHandler');

chai.use(chaiHttp);
chai.should();

let createdId = '';

describe('Policies', () => {
  describe('GET /policies', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should get all policies', (done) => {
      const stub = sinon
        .stub(Policy, 'find')
        .resolves([{ name: 'policy 1' }, { name: 'policy 2' }]);
      chai
        .request(app)
        .get('/policies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(2);
          done();
        });
    });

    it('should return error', (done) => {
      const customError = new CustomError('SERVER ERROR', 'mock error', 500);
      sinon.stub(Policy, 'find').rejects(customError);
      chai
        .request(app)
        .get('/policies')
        .end((err, res) => {
          chai.expect(res.error.status).to.equal(500);
          done();
        });
    });
  });

  describe('GET /policies/:id', () => {
    afterEach(() => {
      sinon.restore();
    });

    const validId = '66a080e1d34365656183f37c';
    const notfoundId = '66a080e1d34365656183f37a';
    const mockId = '1';

    it('should get all policies', (done) => {
      sinon.stub(Policy, 'findById').resolves({ name: 'policy 1' });
      chai
        .request(app)
        .get(`/policies/${validId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include({ name: 'policy 1' });
          done();
        });
    });

    it('should return error 400 because id is invalid', (done) => {
      // sinon.stub(Policy, 'findById').resolves({ name: 'policy 1' });
      chai
        .request(app)
        .get(`/policies/${mockId}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message');
          res.body.message.should.equal('please provide a valid id');
          // res.body.should.be.an('object');
          done();
        });
    });

    it('should return error 404 not found', (done) => {
      // sinon.stub(Policy, 'findById').resolves({ name: 'policy 1' });
      chai
        .request(app)
        .get(`/policies/${notfoundId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal('resource not found');
          // res.body.should.be.an('object');
          done();
        });
    });
  });

  describe('POST /policies', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should create new policy', (done) => {
      chai
        .request(app)
        .post('/policies')
        .send({
          name: 'policy 2',
          type: 'policy',
          premium: 100,
          coverage: 10000
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.include({
            name: 'policy 2'
          });
          res.body.should.haveOwnProperty('id');
          createdId = res.body.id;
          done();
        });
    });

    it('should return validation error 400', (done) => {
      chai
        .request(app)
        .post('/policies')
        .send({
          name: 'policy 2',
          type: 'policy',
          premium: 100
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.haveOwnProperty('details');
          res.body.details.should.be.an('array');
          res.body.details[0].message.should.contain('coverage');
          done();
        });
    });

    it('should return error 500', (done) => {
      const customError = new CustomError('SERVER ERROR', 'mock error', 500);
      sinon.stub(Policy.prototype, 'save').rejects(customError);
      chai
        .request(app)
        .post('/policies')
        .send({
          name: 'policy 2',
          type: 'policy',
          premium: 100,
          coverage: 10000
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.haveOwnProperty('message');
          res.body.message.should.equal('mock error');
          done();
        });
    });
  });

  describe('PUT /policies', () => {
    afterEach(() => {
      sinon.restore();
    });

    const validId = '66a080e1d34365656183f37c';
    const notfoundId = '66a080e1d34365656183f37a';
    const mockId = '1';

    it('should update existing policy', (done) => {
      chai
        .request(app)
        .put(`/policies/${createdId}`)
        .send({
          name: 'policy edited'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.include({
            name: 'policy edited'
          });
          done();
        });
    });

    it('should return error 500', (done) => {
      const customError = new CustomError('SERVER ERROR', 'mock error', 500);
      sinon.stub(Policy, 'updateOne').rejects(customError);
      chai
        .request(app)
        .put(`/policies/${createdId}`)
        .send({
          name: 'policy edited 2'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.an('object');
          res.body.should.include({
            message: 'mock error'
          });
          done();
        });
    });
  });

  describe('DELETE /policies', () => {
    afterEach(() => {
      sinon.restore();
    });

    const validId = '66a080e1d34365656183f37c';
    const notfoundId = '66a080e1d34365656183f37a';
    const mockId = '1';

    it('should delete policy', (done) => {
      chai
        .request(app)
        .delete(`/policies/${createdId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.include({
            name: 'policy edited'
          });
          done();
        });
    });

    it('should return error 500', (done) => {
      const customError = new CustomError('SERVER ERROR', 'mock error', 500);
      sinon.stub(Policy, 'findOneAndDelete').rejects(customError);
      chai
        .request(app)
        .delete(`/policies/${createdId}`)
        .send({
          name: 'policy edited 2'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.an('object');
          res.body.should.include({
            message: 'mock error'
          });
          done();
        });
    });
  });
});
