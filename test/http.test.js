const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs')
const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const { expect, request, should } = chai
const app = require('../app.js')

describe('Integration test on login and register', () => {
        this.currentTest = {}
        let username = 'yde'
        let password = 'root'
        let role = 'User'

        beforeEach(async () => {
            await userModel.clear()
            this.currentTest.user = await userModel.postUserModel(
                username,
                password,
                role
            )
            //  console.log(this.currentTest.user);
    
            this.currentTest.userID = this.currentTest.user._id
            // console.log('user id');
            
            // console.log(this.currentTest.userID);
            
            this.currentTest.token =
                await userModel.getUserModel("yde", "root")
                // console.log('token');
                // console.log(this.currentTest.token);

                // console.log(this.currentTest.token.token);
                
                
        })
        it('Should create a user integration test', () => { //how to test a hashed password?
            // console.log(this.currentTest.user);
            
            const success = bcrypt.compareSync('root', this.currentTest.user.password)
            // console.log(success);
            

            let fields = this.currentTest.user
            request(app)
                .post('/user')
            // set('Authorization', `Bearer ${this.test.token}`)
                .set('Content-Type', `application/json`)
                .send(fields)
                .end((err, res) => {
                    // console.log(res);

                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.have.keys(['fields'])
                    // console.log('fields');
                    
                    // console.log(fields);
                    
                })
            
        })

        it('Should login a user with a token integration test', () => {            
            // console.log(this.currentTest.user);
            //HÄMTA FKN TOKEN
            // console.log('TOKEN MAADDAAAA');
            // console.log(this.currentTest.token);
            
            let token = this.currentTest.token.token;
            // console.log(token);
            
            let data = this.currentTest.user
            request(app)
                .get('/user')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', `application/json`)
                .send(data)
                .end((err, res) => {
                    // console.log(res);

                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.have.keys(['data'])
                    // console.log('data');
                    
                    // console.log(data);
                    
                })
        })
    })