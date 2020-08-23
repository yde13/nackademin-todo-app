import nedb from 'nedb';
import ejs from 'ejs';

let db = new nedb({filename : './models/tasks', autoload: true});
db.loadDatabase();

function mainPage () {
    return new Promise((resolve, reject) => {
        db.find({}, (err,docs) => {
            if (!err) {
                resolve(docs);
            } else {
                reject(err);
            }
        });
    });    
}

function addTask(task) {
    return new Promise((resolve, reject) => {
        db.insert(task, (err, newDoc) => {
            if(!err) {
                console.log(newDoc)
                resolve(newDoc);
            } else {
                reject(err);
            }       
        })
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


function editTask(id, task) {
    return new Promise((resolve, reject) => {
        db.update({_id :id},{ $set: task }, {returnUpdatedDocs: true }, (err, num, updateDocs) => {
            if (err) {
                reject(err)
            } else {
                console.log(updateDocs)
                resolve(updateDocs)
            }
        });
    });
}

function taskIsDone (id, done) {
    return new Promise((resolve, reject) => {
        db.update({ _id: id }, { $set: done }, { returnUpdatedDocs: true }, (err, num, updateDocs) => {
            if (err) {
                reject(err)
            } else {
                console.log(updateDocs);
                resolve(updateDocs)
            }
        })
    })
}

function deleteTask (_id) {
    return new Promise((resolve, reject) => {
        db.remove ({_id : _id}, {}, function (err, docs) {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }            
        });
    });
}

export {mainPage, ejs, nedb, addTask, editTask, deleteTask, taskIsDone};