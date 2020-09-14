const express = require('express');
const routes = require('./routes/router');
const app = express();
const { authorization, user, admin } = require('./middlewares/auth')


//Middelware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


//Frontend
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//Routes
app.use('/', routes)

//Server
//is in server.js
module.exports = app