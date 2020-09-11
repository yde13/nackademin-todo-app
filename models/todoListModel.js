const db = require('../database/database.js');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()

function getTodoListModel() {
    return new Promise(async(resolve, reject) => {
        
        try {
            let lists = await db.todoList.find({});
            resolve(lists);
        } catch (error) {
            reject(error);
        } 
    }); 
}

function getSingleTodoListModel(id) {
    return new Promise(async(resolve, reject) => {
        
        try {
            let lists = await db.posts.find({listID: id});
            resolve(lists);
        } catch (error) {
            reject(error);
        } 
    }); 
}

function addTodoListModel(todoList) {
    return new Promise(async(resolve, reject) => {
        
        try {
            let lists = await db.todoList.insert(todoList);

            resolve(lists);
        } catch (error) {
            reject(error);
        }
    })
}

function editTodoListModel (id, todoList) {
    return new Promise(async(resolve, reject) => {

        try {
            let lists = await db.todoList.update({_id :id},{ $set: todoList });            

            resolve(lists);
        } catch (error) {
            reject(error);
        }
    });
}

function deleteTodoListModel (id) {
    return new Promise(async(resolve, reject) => {
        try {

            const removedList = await db.todoList.remove({_id : id});

            resolve(removedList);
        } catch (error) {
            reject(error)
        }
    });
}

function clear() {
    db.todoList.remove({}, {multi: true})
}

module.exports = {
    getTodoListModel,
    getSingleTodoListModel,
    addTodoListModel,
    editTodoListModel,
    deleteTodoListModel,
    clear
}