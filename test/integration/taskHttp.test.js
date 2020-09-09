const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs')
const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const { expect, request, should } = chai
const app = require('../../app.js')

describe('Integration test on tasks', () => { //testar jag ens tasks här??
    let currentTest = {}
    let username = 'yde'
    let password = 'root'
    let role = 'Admin'

    before(async () => {
        await userModel.clear()
        currentTest.user = await userModel.postUserModel(
            username,
            password,
            role
        )

        currentTest.userID = currentTest.user._id

        currentTest.token =
            await userModel.getUserModel(username, password)


    })

    it('Should get todos authorized integration test', () => {

        let token = currentTest.token.token;

        let data = currentTest.user;
        request(app)
            .get('/task')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json

            })
    })

    it('Should add todos authorized integration test', () => {

        let token = currentTest.token.token;

        let data = currentTest.user;
        request(app)
            .post('/task')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json

            })
    })

    it('Should edit todos authorized integration test', () => {

        let token = currentTest.token.token;

        let id = currentTest.user._id

        let data = {username: 'User'}

        request(app)
            .put(`/task/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {
                
                expect(res).to.have.status(200)
                expect(res).to.be.json

            })
    })

    it('Should delete todos authorized integration test', () => {

        let token = currentTest.token.token;

        let id = currentTest.user._id

        let data = currentTest.user;
        request(app)
            .delete(`/task/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.keys(['data'])


            })
    })


})