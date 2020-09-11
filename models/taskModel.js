const db = require('../database/database.js');

function getTaskModel () {
    return new Promise(async(resolve, reject) => {
        
        try {

            const posts = await db.posts.find({});

            resolve(posts);
        } catch (error) {
            reject(error);
        } 
    });    
}

function getSingleTaskModel(id) {
    return new Promise(async(resolve, reject) => {
        
        try {
            let lists = await db.posts.find({createdBy: id});
            resolve(lists);
        } catch (error) {
            reject(error);
        } 
    }); 
}

function addTaskModel(task) {
    return new Promise(async(resolve, reject) => {
        
        try {

            const post = await db.posts.insert(task);

            resolve(post);
        } catch (error) {
            reject(error);
        }
    })
}


function editTaskModel(id, task) {
    return new Promise(async(resolve, reject) => {

        try {

            const post = await db.posts.update({_id :id},{ $set: task });
            
            resolve(post);
        } catch (error) {
            reject(error);
        }
    });
}


function deleteTaskModel (id) {

    return new Promise(async(resolve, reject) => {
        try {

            const removed = await db.posts.remove({_id : id});

            resolve(removed);
        } catch (error) {
            reject(error)
        }
    });
}

function clear() {
    db.posts.remove({}, {multi: true})
}

module.exports = {
    getTaskModel,
    getSingleTaskModel,
    addTaskModel,
    editTaskModel,
    deleteTaskModel,
    clear
    //taskIsDoneModel
}