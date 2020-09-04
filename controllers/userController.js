const model = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


async function getUserController(req, res) {

    // const secret = process.env.SECRET;
    
    const username = req.body.username
    const password = req.body.password

    
    const user = await model.getUserModel(username, password);
    // const success = bcrypt.compareSync(passwordAttempt, user.password)
    // const token = jwt.sign(user, secret)

    // console.log(secret);
    

    // console.log(passwordAttempt);
    // console.log(user);
    // console.log(token);




    console.log(user.username + ' här har vi user');
    if (user.username == username) {
        //res.redirect('/todos')
        res.json('Logged in as ' + user.username )
    } else {
        res.json('Wrong password or username')
    }


}

function postUserController(req, res) {
    try {
        // const password = req.body.password;
        // console.log(password);
        // const hash = bcrypt.hashSync(password, 10)
        // console.log(hash);

        // const credentials = {
        //     username: req.body.username,
        //     password: hash,
        //     role: req.body.role
        // }
        const username = req.body.username
        const password = req.body.password
        const role = req.body.role

        // const credentials = {
        //     username: req.body.username,
        //     password: req.body.password,
        //     role: req.body.role
        // }

        model.postUserModel(username, password, role);
        res.redirect('/todos')//Måste fixa så att den sparar token i clienten så att den vet vem det är

        //res.json("Lade till " + credentials.username)

    } catch (error) {
        res.status(400).json({msg: "Failed"})
    }

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
        const updatedUser = model.editUserModel(id, user)
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
