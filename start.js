const app = require('./app.js')
const Database = require('./database/database')
require('dotenv').config()

const port = process.env.PORT || 5500

Database.connect().then(() =>
    app.listen(port, () => console.log("Server running on port " + port + ";"))

)
