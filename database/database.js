var Datastore = require('nedb-promises');
require('dotenv').config()

let db = {}
switch (process.env.ENVIRONMENT) {
    case 'development':
        console.log('DEVELOPMENT DATABASE');
        
        db.posts = new Datastore({ filename: './database/development/taskDatabase', autoload: true });
        db.users = new Datastore({ filename: './database/development/userDatabase', autoload: true });
        db.todoList = new Datastore({ filename: './database/development/todoListDatabase', autoload: true });


        break;

    case 'test':
            console.log('TEST DATABASE');

        db.posts = new Datastore({ filename: './database/test/test_taskDatabase', autoload: true });
        db.users = new Datastore({ filename: './database/test/test_userDatabase', autoload: true });
        db.todoList = new Datastore({ filename: './database/test/test_todoListDatabase', autoload: true });

        
        break;
}


module.exports = db;
