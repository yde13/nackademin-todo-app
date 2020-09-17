// var Datastore = require('nedb-promises');
// require('dotenv').config()

// let db = {}
// switch (process.env.ENVIRONMENT) {
//     case 'development':
//         console.log('DEVELOPMENT DATABASE');

//         db.posts = new Datastore({ filename: './database/development/taskDatabase', autoload: true });
//         db.users = new Datastore({ filename: './database/development/userDatabase', autoload: true });
//         db.todoList = new Datastore({ filename: './database/development/todoListDatabase', autoload: true });


//         break;

//     case 'test':
//         console.log('TEST DATABASE');

//         db.posts = new Datastore({ filename: './database/test/test_taskDatabase', autoload: true });
//         db.users = new Datastore({ filename: './database/test/test_userDatabase', autoload: true });
//         db.todoList = new Datastore({ filename: './database/test/test_todoListDatabase', autoload: true });


//         break;
// }


// module.exports = db;

const mongoose = require('mongoose')
require('dotenv').config()

let mongoDatabase

switch (process.env.ENVIRONMENT) {
    case 'development':
        console.log('DEVELOPMENT');

        mongoDatabase = {
            // mongodb+srv://user:password@host/dbname
            getUri: async () => /

                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        }

        break;

    case 'test':
        console.log('TEST');

        const { MongoMemoryServer } = require('mongodb-memory-server')
        mongoDatabase = new MongoMemoryServer()
        
        break;
        
    // case 'production':
    //     console.log('PRODUCTION');
        
    //     mongoDatabase = {
    //         // mongodb+srv://user:password@host/dbname
    //         getUri: async () =>
    //             `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    //     }
    //     break;
}

async function connect() {
    console.log('CONNECTED');
    
    let uri = await mongoDatabase.getUri()

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

async function disconnect() {
    await mongoDatabase.stop()
    await mongoose.disconnect()
}


module.exports = {
    connect, disconnect
}
