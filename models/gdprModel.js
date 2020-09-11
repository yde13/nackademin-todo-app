const db = require('../database/database.js');

function getGdprModel () {
    return new Promise(async(resolve, reject) => {
        
        try {

            let users = await db.users.find({});
            let tasks = await db.posts.find({});
            let lists = await db.todoList.find({});

            resolve({users, tasks, lists});

        } catch (error) {
            reject(error);
        } 
    });    
}

function getSingleGdprModel(id) {
    return new Promise(async(resolve, reject) => {
        
        try {
            let users = await db.users.find({_id: id});
            let tasks = await db.posts.find({createdBy: id});
            let lists = await db.todoList.find({createdBy: id});

            resolve({users, tasks, lists});
        } catch (error) {
            console.log(error);
            
            reject(error);
        } 
    }); 
}

function deleteGdprModel (id) {

    return new Promise(async(resolve, reject) => {
        try {

            let users = await db.users.remove({_id: id});
            let tasks = await db.posts.remove({createdBy: id});
            let lists = await db.todoList.remove({createdBy: id});

            resolve({users, tasks, lists});

        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    getGdprModel,
    getSingleGdprModel,
    deleteGdprModel
}