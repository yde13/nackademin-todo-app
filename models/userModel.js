const db = require('../database/database.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    role: String
})

const User = mongoose.model('users', userSchema)


async function getUserModel(username, password) {
    try {

        const secret = process.env.SECRET;

        try {

            const user = await User.findOne({ username: username })

            const success = bcrypt.compareSync(password, user.password)

            const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, secret)
            return { user, token, success };


        } catch (error) {
            console.log(error);
            return error
        }

    } catch (error) {
        return error
    }


}


async function postUserModel(username, password, role) {

    try {

        // const { email, password } = fields
        const hashedPassword = bcrypt.hashSync(password, 10)
        console.log(hashedPassword);
        credentials = {
            username: username,
            password: hashedPassword,
            role: role,
        }
        const user = await User.create(credentials)
        console.log(user);

        return user._doc

    } catch (error) {
        return (error)
    }
}

function editUserModel(id, user) {
    return new Promise(async (resolve, reject) => {

        try {
            const hashedPassword = bcrypt.hashSync(user.password, 10)

            let credentials = {
                username: user.username,
                password: hashedPassword
            }

            const post = await User.updateOne({ _id: id }, { $set: credentials }); //updateOne

            resolve(post);
        } catch (error) {
            reject(error);
        }
    });
}

function deleteUserModel(id) {

    return new Promise(async (resolve, reject) => {
        try {

            const removed = await User.deleteOne({ _id: id }); //deleteOne

            resolve(removed);
        } catch (error) {
            reject(error);
        }
    });
}

async function getAllUsersModel() {
    try {
        const user = await User.find({})
        return user

    } catch (error) {
        return error
    }
}

async function getOneUsersModel(id) {
    try {
        console.log('här');
        
        const user = await User.findOne({_id: id})
        return user

    } catch (error) {
        return error
    }
}

async function clear() {
    try {
        console.log('här');

        let deleted = await User.deleteMany({})
        return deleted
    } catch (error) {
        return error
    }


}



module.exports = {
    getUserModel,
    postUserModel,
    editUserModel,
    deleteUserModel,
    clear,
    getAllUsersModel,
    getOneUsersModel
}