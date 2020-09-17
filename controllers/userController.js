const model = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


async function getUserController(req, res) {


    const username = req.body.username
    const password = req.body.password


    const user = await model.getUserModel(username, password);

    if (user.user.username == username && user.success == true) { //inge felmeddelande för fel username
        //res.redirect('/todos')
        res.send({data: user}) //denna behövs för test

        // res.redirect('/todos')
    } else {

        res.send({error: 'Wrong password or username'})
        // res.json({data: user.user}) //denna behövs för test

    }


}

async function postUserController(req, res) {
    try {
        const username = req.body.username
        const password = req.body.password
        const role = req.body.role

        let user = await model.postUserModel(username, password, role);

        res.json({ fields: user })

    } catch (error) {
        res.status(400).json({ msg: "Failed" })
    }

}

async function editUserController(req, res) {

    try {

        var id = req.params.id;
        let user = {
            username: req.body.username,
            password: req.body.password
        }
        const updatedUser = await model.editUserModel(id, user)

        res.json(user.username + " is updated");
    } catch (error) {
        console.log({ error: error.message })
    }
}

function deleteUserController(req, res) {
    try {
        let id = req.params.id;
        model.deleteUserModel(id)
        res.json({ data: id })
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    getUserController,
    postUserController,
    editUserController,
    deleteUserController
}
