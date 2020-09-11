const db = require('../database/database.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


async function getUserModel(username, password) {
    try {

        const secret = process.env.SECRET;

        try {
            const user = await db.users.findOne({ username: username })

            const success = bcrypt.compareSync(password, user.password)
            const token = jwt.sign(user, secret)
            return { user, token, success };


        } catch (error) {
            console.log(error);
            return error
        }

    } catch (error) {
        return error
    }


}

function postUserModel(username, password, role) {
    return new Promise(async (resolve, reject) => {

        try {
 
            const hashedPassword = bcrypt.hashSync(password, 10)

            credentials = {
                username: username,
                password: hashedPassword,
                role: role,
            }


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