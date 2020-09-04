const db = require('../database/database.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


async function getUserModel(username, password) {
    try {
        // console.log(username + '      ' + password + ' höhöhöhöh');
        
        const secret = process.env.SECRET;
        // const passwordAttempt = req.body.password;
        // const user = await model.getUserModel(username);
       

        const user = await db.users.findOne({ username: username })
        // console.log(user.password + ' whut');
        // console.log(password + ' weird');
        
        // console.log(user.password + '    lösen');
        
        const success = bcrypt.compareSync(password, user.password)
        const token = jwt.sign(user, secret)
        // console.log(success + ' hej');
        // console.log(token + ' hejdå');
        
        
        return {user, token};
    } catch (error) {
        return error
    }


}

function postUserModel(username, password, role) {
    return new Promise(async (resolve, reject) => {

        try {
            // const user = password
            // console.log('här');
            
            // console.log( password);
            // console.log( username);
            
            
            // const password = user
            // console.log(password);
            const hashedPassword = bcrypt.hashSync(password, 10)
            // console.log(hashedPassword);

            credentials = {
                username: username,
                password: hashedPassword,
                role: role,
            }
            // const user = username
            // console.log('hje ' + user.password);
            

            const insert = await db.users.insert(credentials);
            resolve(insert);
        } catch (error) {
            reject(error)
        }
    })
}

function editUserModel(id, user) {
    return new Promise(async (resolve, reject) => {

        try {

            const post = await db.users.update({ _id: id }, { $set: user });
            // console.log(post + " user");

            resolve(post);
        } catch (error) {
            reject(error);
        }
    });
}

function deleteUserModel(id) {

    return new Promise(async (resolve, reject) => {
        try {

            const removed = await db.users.remove({ _id: id });
            // console.log(removed + " post");

            resolve(removed);
        } catch (error) {
            reject(error);
        }
    });
}

async function clear() {
    await db.users.remove({})
}



module.exports = {
    getUserModel,
    postUserModel,
    editUserModel,
    deleteUserModel,
    clear
}