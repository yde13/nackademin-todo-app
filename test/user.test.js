const userModel = require('../models/userModel');
//const userController = require('../controllers/userController')

// const chai = require('chai');
// const chaiHttp = require('chai-http')
// chai.use(chaiHttp)
require('chai').should();

// const { expect, request, should } = chai
// const app = require('../app')


describe('users', () => {
    beforeEach(() => {
        userModel.clear()
    })

    it('Should get one user and login', async () => {
        await userModel.postUserModel({
            username: "Alexandre",
            password: "philip",
            role: "Admin",
            _id: "1"
        })
        const user = await userModel.getUserModel('Alexandre')
        user.username.should.equal("Alexandre")
    })

    it('Should post one user and register', async () => {
        let credentials = {
            username: "Alexandre",
            password: "philip",
            role: "Admin",
            _id: "1"
        }
        const user = await userModel.postUserModel(credentials)
        user.should.eql({
            username: "Alexandre",
            password: "philip",
            role: "Admin",
            _id: "1"
        })
    })

    it('Should edit a user', async () => {
        await userModel.postUserModel({
            username: "Jacob",
            password: 'root',
            role: "User",
            _id: "3"
        })
        let id = '3'
        let credentials = {
            username: 'Jacob',
            password: 'root',
            role: 'Admin'
        }
        const updatedUser = await userModel.editUserModel(id, credentials)
        updatedUser.should.equal(1)

    })

    it('Should delete a user', async () => {
        await userModel.postUserModel({
            username: "Amelia",
            password: 'root',
            role: "User",
            _id: "3"
        })
        let id = '3'
        const deleteUser = await userModel.deleteUserModel(id)
        deleteUser.should.equal(1)
    })

})