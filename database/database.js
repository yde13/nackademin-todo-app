var Datastore = require('nedb-promises');
require('dotenv').config()

let db = {}
switch (process.env.ENVIRONMENT) {
    case 'development':
        console.log('DEVELOPMENT DATABASE');
        
        db.posts = new Datastore({ filename: './database/taskDatabase', autoload: true });
        db.users = new Datastore({ filename: './database/userDatabase', autoload: true });

        break;

    case 'test':
            console.log('TEST DATABASE');

        db.posts = new Datastore({ filename: './database/test_taskDatabase', autoload: true });
        db.users = new Datastore({ filename: './database/test_userDatabase', autoload: true });

        
        break;
}


module.exports = db;
