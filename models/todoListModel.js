const { getTaskModelByListID } = require('../models/taskModel');
const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()

const listSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    listID: String,
    createdBy: String
})

const List = mongoose.model('lists', listSchema)


function getTodoListModel() {
    return new Promise(async(resolve, reject) => {
        
        try {
            let lists = await List.find({});
            resolve(lists);
        } catch (error) {
            reject(error);
        } 
    }); 
}

function getSingleTodoListModel(id) {
    return new Promise(async(resolve, reject) => {
        
        try {
            let lists = await getTaskModelByListID(id); // task schema ska vara här
            resolve(lists);
        } catch (error) {
            reject(error);
        } 
    }); 
}

function addTodoListModel(todoList) {
    return new Promise(async(resolve, reject) => {
        
        try {
            let lists = await List.create(todoList);

            resolve(lists);
        } catch (error) {
            reject(error);
        }
    })
}

function editTodoListModel (id, todoList) {
    return new Promise(async(resolve, reject) => {

        try {
            let lists = await List.updateOne({_id :id},{ $set: todoList });            

            resolve(lists);
        } catch (error) {
            reject(error);
        }
    });
}

function deleteTodoListModel (id) {
    return new Promise(async(resolve, reject) => {
        try {

            const removedList = await List.deleteOne({_id : id});

            resolve(removedList);
        } catch (error) {
            reject(error)
        }
    });
}

function getWhoCreatedTodoListModel(id) {
    return new Promise(async(resolve, reject) => {
        
        try {
            let lists = await List.find({createdBy: id});
            resolve(lists);
        } catch (error) {
            reject(error);
        } 
    }); 
}

function deleteWhoCreatedTodoListModel (id) {
    return new Promise(async(resolve, reject) => {
        try {

            const removedList = await List.deleteMany({createdBy : id});

            resolve(removedList);
        } catch (error) {
            reject(error)
        }
    });
}

function clear() {
    List.deleteMany({}, {multi: true})
}

module.exports = {
    getTodoListModel,
    getSingleTodoListModel,
    addTodoListModel,
    editTodoListModel,
    deleteTodoListModel,
    clear,
    getWhoCreatedTodoListModel,
    deleteWhoCreatedTodoListModel
}