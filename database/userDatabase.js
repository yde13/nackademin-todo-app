var Datastore = require('nedb-promises'), 

db = new Datastore({ filename: './database/userDatabase', autoload: true });

module.exports = db;
