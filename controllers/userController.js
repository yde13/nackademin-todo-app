const model = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function getUserController(req, res) {

    const secret = 'secret'
    const passwordAttempt = req.body.password;
    const user = await model.getUserModel(req.body.username);
    const success = bcrypt.compareSync(passwordAttempt, user.password)
    const token = jwt.sign(user, secret)

    console.log(passwordAttempt);
    console.log(user);
    console.log(token);




    console.log(success);
    if (success) {
        res.json('Logged in as ' + user.username + " " + token)
    } else {
        res.json('Wrong password or username')
    }


}

function postUserController(req, res) {

    const password = req.body.password;
    console.log(password);
    const hash = bcrypt.hashSync(password, 10)
    console.log(hash);

    const credentials = {
        username: req.body.username,
        password: hash,
        role: req.body.role
    }

    model.postUserModel(credentials);

    res.json("Lade till " + credentials.username)
}

function editUserController(req, res) {

    try {
        const password = req.body.password;
        const hash = bcrypt.hashSync(password, 10)
        var id = req.params.id;
        let user = {
            username: req.body.username,
            password: hash
        }
        const updatedUser =  model.editUserModel(id, user)
        res.json(user.username + " is updated");
    } catch (error) {
        console.log({ error: error.message })
    }
}

function deleteUserController(req, res) {
    try {
        let id = req.params.id;
         model.deleteUserModel(id)
        res.json("Deleted " + id)
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
