const db = require('../database/database.js');

function getTaskModel () {
    return new Promise(async(resolve, reject) => {
        
        try {

            const posts = await db.posts.find({});
            // console.log(posts);

            resolve(posts);
        } catch (error) {
            reject(error);
        } 
    });    
}

function addTaskModel(task) {
    return new Promise(async(resolve, reject) => {
        
        try {

            const post = await db.posts.insert(task);
            // console.log(post);

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
            // console.log(post + " post");

            resolve(post);
        } catch (error) {
            reject(error);
        }
    });
}

// function taskIsDoneModel (id, done) {
//     return new Promise((resolve, reject) => {
//         db.update({ _id: id }, { $set: done }, { returnUpdatedDocs: true }, (err, num, updateDocs) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 console.log(updateDocs);
//                 resolve(updateDocs)
//             }
//         })
//     })
// }

function deleteTaskModel (id) {

    return new Promise(async(resolve, reject) => {
        try {

            const removed = await db.posts.remove({_id : id});
            // console.log(removed + " post");

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
    addTaskModel,
    editTaskModel,
    deleteTaskModel,
    clear
    //taskIsDoneModel
}