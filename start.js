const app = require('./app.js')
require('dotenv').config()


const port = process.env.PORT || 5500
app.listen(port);
console.log("Server running on port " + port + ";")