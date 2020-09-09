const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs')
const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const { expect, request, should } = chai
const app = require('../../app.js')

describe('Integration test on login and register', () => {
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
    it('Should create a user integration test', () => { 


        let fields = currentTest.user
        request(app)
            .post('/user')
            // set('Authorization', `Bearer ${this.test.token}`) här ska man kanske använda token
            .set('Content-Type', `application/json`)
            .send(fields)
            .end((err, res) => {

                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.keys(['fields'])

            })

    })

    it('Should login a user with a token integration test', () => {

        let token = currentTest.token.token;


        let data = currentTest.user
        request(app)
            .post('/users') //should be post
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {

                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.keys(['data'])


            })
    })

    it('Should delete a user integration test', () => {            

        let token = currentTest.token.token;

        let id = currentTest.user._id
        
        let data = currentTest.user
        
        request(app)
            .delete(`/user/${id}`)
            .set('Authorization', `Bearer ${token}`) //change role to admin for this to work on the top
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {

                expect(res).to.have.status(200)
                expect(res).to.be.json


            })
    })
})