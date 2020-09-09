const db = require('../database/database.js');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()

function getTodoListModel() {
    return new Promise(async(resolve, reject) => {
        
        try {
            let lists = await db.todoList.find({});
            // console.log(posts);
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
            //  console.log(lists);
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
            // console.log(lists);

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
            console.log('Edited: ' + todoList.title);
            

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
            // console.log(removed + " post");

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