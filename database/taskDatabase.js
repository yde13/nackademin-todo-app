var Datastore = require('nedb-promises'), 

db = new Datastore({ filename: './database/taskDatabase', autoload: true });

module.exports = db;
