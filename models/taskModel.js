const db = require('../database/taskDatabase.js');

function getTaskModel () {
    return new Promise(async(resolve, reject) => {
        
        try {

            const posts = await db.find({});
            console.log(posts);

            resolve(posts);
        } catch (error) {
            reject(error);
        } //check if user is admin or user!!!!!
    });    
}

function addTaskModel(task) {
    return new Promise(async(resolve, reject) => {
        // db.insert(task, (err, newDoc) => {
        //     if(!err) {
        //         console.log(newDoc)
        //         resolve(newDoc);
        //     } else {
        //         console.log(err)
        //         reject(err);
        //     }       
        // })
        
        try {

            const post = await db.insert(task);
            console.log(post);

            resolve(post);
        } catch (error) {
            reject(error);
        }
    })
}

// TODO:
// 2. ÄNDRA FRÅN AJAX TILL AXIOS ELLER FETCH
// 3. FIXA SNYGG FRONTEND


// DONE:
// ADDA TASK
// DELETE TASK
// DISPLAY ALLA TASKS
// PÅ NÅTT SÄTT FIXA SÅ ATT MAN SER ATT EN TASK ÄR DONE 
// GÖRA SÅ ATT EDIT FUNKAR
// FIXA BACKEND FÖR ATT SE OM TASKEN ÄR GJORD ELLER INTE(TRUE ELLER FALSE), SÅ ATT DET SPARAS OM MAN RESFRESHAR SIDAN


function editTaskModel(id, task) {
    return new Promise(async(resolve, reject) => {
        // db.update({_id :id},{ $set: task }, {returnUpdatedDocs: true }, (err, num, updateDocs) => {
        //     if (err) {
        //         reject(err)
        //     } else {
        //         console.log("här");

        //         console.log(updateDocs)
                
        //         resolve(updateDocs)
        //     }
        // });

        try {

            const post = await db.update({_id :id},{ $set: task });
            console.log(post + " post");

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
    console.log("aktiverade deletePostModel")

    return new Promise(async(resolve, reject) => {
        try {

            const removed = await db.remove({_id : id});
            console.log(removed + " post");

            resolve(removed);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getTaskModel,
    addTaskModel,
    editTaskModel,
    deleteTaskModel,
    //taskIsDoneModel
}