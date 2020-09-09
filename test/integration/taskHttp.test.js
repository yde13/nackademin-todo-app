const userModel = require('../../models/userModel');
const taskModel = require('../../models/taskModel');

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

    let title = 'Post'
    let done = false
    let created = '2020-06-04'
    let urgent = false
    let listID = '1'

    before(async () => {
        await userModel.clear()
        currentTest.user = await userModel.postUserModel(
            username,
            password,
            role
        )

        currentTest.task = await taskModel.addTaskModel({
            title,
            done,
            created,
            urgent,
            listID
        })
            // console.log(currentTest.task);
            
        currentTest.userID = currentTest.user._id

        currentTest.token =
            await userModel.getUserModel(username, password)


    })

    it('Should get todos authorized integration test', () => {

        let token = currentTest.token.token;
        // console.log(JSON.stringify(currentTest.task));
        
        let data = currentTest.task;
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

        let data = currentTest.task;
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

        let id = currentTest.task._id

        let data = {title: 'Städa'}

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

        let id = currentTest.task._id

        let data = currentTest.task;
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