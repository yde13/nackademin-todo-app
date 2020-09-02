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

app.get('/todos', function (req, res) { //authorization, user,
  res.sendFile(__dirname + '/public/views/todos.html');
});

//Routes
app.use('/', routes)

//Server
const port = 5500
app.listen(port);
console.log("Server running on port " + port + ";")