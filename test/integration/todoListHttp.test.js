const userModel = require('../../models/userModel');
const todoListModel = require('../../models/todoListModel');
const taskModel = require('../../models/taskModel');


const bcrypt = require('bcryptjs')
const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const { expect, request, should } = chai
const app = require('../../app.js')

describe('Integration test on todo list', () => { 
    let currentTest = {}
    let username = 'yde'
    let password = 'root'
    let role = 'Admin'

    let title = 'List 1'
    let listID = '1'

    let done = false
    let created = '2020-06-04'
    let urgent = false

    before(async () => {
        await userModel.clear()
        currentTest.user = await userModel.postUserModel(
            username,
            password,
            role
        )

        currentTest.list = await todoListModel.addTodoListModel({
            title,
            listID
        })

        currentTest.task = await taskModel.addTaskModel({
            title,
            done,
            created,
            urgent,
            listID
        })
            
        currentTest.userID = currentTest.user._id

        currentTest.token =
            await userModel.getUserModel(username, password)


    })

    it('Should get todo lists authorized integration test', () => {

        let token = currentTest.token.token;
        
        let data = currentTest.list;
        request(app)
            .get('/todoList')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {                
                expect(res).to.have.status(200)
                expect(res).to.be.json

            })
    })

    it('Should get a single todo list authorized integration test', () => {

        let token = currentTest.token.token;
        // console.log(JSON.stringify(currentTest.task));
        let id = currentTest.list.listID
        let data = currentTest.task;
        request(app)
            .get(`/todoList/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {                
                expect(res).to.have.status(200)
                expect(res).to.be.json

            })
    })

    it('Should add todo list authorized integration test', () => {

        let token = currentTest.token.token;

        let data = currentTest.list;
        request(app)
            .post('/todoList')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json

            })
    })

    it('Should edit todo list authorized integration test', () => {

        let token = currentTest.token.token;

        let id = currentTest.list._id

        let data = {title: 'List 2'}

        request(app)
            .put(`/todoList/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {
                
                expect(res).to.have.status(200)
                expect(res).to.be.json

            })
    })

    it('Should delete todo list authorized integration test', () => {

        let token = currentTest.token.token;

        let id = currentTest.list._id

        let data = currentTest.list;
        request(app)
            .delete(`/todoList/${id}`)
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