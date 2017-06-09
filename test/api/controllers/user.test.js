const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const sinon = require('sinon');
require('sinon-mongoose');
const server = require('../../../server');
sinon.mock(mongoose.model('User'));

before(done => {
    mongoose.connection.on('connected', () => {
        mongoose.connection.db.dropDatabase();
        done();
    });
});

describe('controllers', () => {

    describe('User', () => {

        describe('GET /user', () => {

            it('should return a users array', done => {

                request(server)
                    .get('/user')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        should.not.exist(err);

                        res.body.should.be.an.Array();

                        done();
                    });
            });

        });

        describe('POST /user', () => {
            it('should accept a user body', done => {

                request(server)
                    .post('/user')
                    .send({ userId: 'AnilJ', password: '@@##$$&&', email: 'anil.jaangra@gmail.com', firstName: 'Anil', lastName: 'Jangra' })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end((err, res) => {
                        should.not.exist(err);
                        res.body.should.be.an.Object();
                        done();
                    });
            });
        });


    });

});
