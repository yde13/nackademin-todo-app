const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs')
const db = require('../../database/database');

//const userController = require('../controllers/userController')
// require('chai').should();


const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const { expect, request, should } = chai
// const app = require('../../app.js')


describe('users', () => {
    before(async function () {
        await db.connect();
    });
    after(async function () {
        await db.disconnect();
    });
    beforeEach(async () => {
        await userModel.clear()
    })

    it('Should get one user and login', async () => {
        
        let username = "Alexandre"
        let password = 'philip'
        let role = 'Admin'

        let credentials = await userModel.postUserModel(
            username, 
            password, 
            role
        )

        

        // console.log(credentials);
        // console.log(decryptPassword + ' decrypt');

        
        const result = await userModel.getUserModel(credentials.username, password)
        
        result.user.username.should.equal(credentials.username) //lite weird med user.user
    })

    it('Should post one user and register', async () => {
        
        let username = "Alexandre"
        let password = 'philip'
        let role = 'Admin'

        let credentials = await userModel.postUserModel(
            username, password, role
            )
            // console.log('credentials');
            
            // console.log(credentials);
            
        const success = bcrypt.compareSync( password, credentials.password)
        // console.log(user);
        success.should.equal(true)
        

        credentials.should.eql({
            username: "Alexandre",
            password: credentials.password,
            role: "Admin",
            _id: credentials._id,
            __v: credentials.__v

        })
    })

    it('Should edit a user', async () => {
        let username = "Alexandre"
        let password = 'philip'
        let role = 'Admin'

        let user = await userModel.postUserModel(
            username, password, role
            )
        let id = user._id
        let credentials = {
            username: 'Jacob',
            password: 'root',
            role: 'Admin'
        }
        const updatedUser = await userModel.editUserModel(id, credentials)
        updatedUser.ok.should.equal(1)

    })

    it('Should delete a user', async () => {
        let username = "Alexandre"
        let password = 'philip'
        let role = 'Admin'

        let user = await userModel.postUserModel(
            username, password, role
            )
        let id = user._id
        const deleteUser = await userModel.deleteUserModel(id)
        deleteUser.ok.should.equal(1)
    })

})
