const db = require('../database/database.js');
const mongoose = require('mongoose')
const {getAllUsersModel, getOneUsersModel, deleteUserModel} = require('../models/userModel')
const { getTodoListModel, getWhoCreatedTodoListModel, deleteWhoCreatedTodoListModel } = require('../models/todoListModel')
const { getTaskModel, getSingleTaskModel, deleteTaskCreatedByModel } = require('../models/taskModel')



function getGdprModel () {
    return new Promise(async(resolve, reject) => {
        
        
        try {

            let users = await getAllUsersModel();
            let lists = await getTodoListModel();
            let tasks = await getTaskModel();
            

            resolve({users, lists, tasks});

        } catch (error) {
            reject(error);
        } 
    });    
}

function getSingleGdprModel(id) {
    return new Promise(async(resolve, reject) => {
        
        try {
            let users = await getOneUsersModel(id);
            let tasks = await getSingleTaskModel(id);
            let lists = await getWhoCreatedTodoListModel(id);

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

            let users = await deleteUserModel(id);
            let tasks = await deleteTaskCreatedByModel(id);
            let lists = await deleteWhoCreatedTodoListModel(id);

            resolve({users, tasks, lists});

        } catch (error) {
            reject(error)
        }
    });
}

function clear() {
    db.posts.remove({}, {multi: true})
    db.users.remove({}, {multi: true})
    db.todoList.remove({}, {multi: true})

}

module.exports = {
    getGdprModel,
    getSingleGdprModel,
    deleteGdprModel,
    clear
}