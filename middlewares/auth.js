const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET

function authorization(req, res, next) {

    if (!req.headers.authorization) return res.sendStatus('403');

    const token = req.headers.authorization.replace("Bearer", "");
    console.log(token)

    try {
        const payload = jwt.verify(token, secret)
        req.user = payload;
        next();
    } catch (error) {
        res.sendStatus(403);
    }
}


function user(req, res, next) {
        
    console.log('Role: ', req.user.role)
    if (req.user.role == 'Admin' || req.user.role == 'User') {
        next()
    } else {
        console.log("Your are not an Admin or A User.")
        return res.sendStatus(403)
    }
}

function admin(req, res, next) {
    console.log('Role: ', req.user.role)
    if(req.user.role == 'Admin'){
        next()
    } else {
        console.log('You are not an Admin')
        return res.sendStatus(403)

    }
}

module.exports = {
    authorization,
    admin,
    user
};

