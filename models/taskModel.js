const db = require('../database/database.js');
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {type: String, unique: true },
    done: Boolean,
    created: String,
    urgent: Boolean,
    listID: String,
    createdBy: String
})

const Task = mongoose.model('tasks', taskSchema)


async function getTaskModel () {
        try {

            const posts = await Task.find({});

            return posts
        } catch (error) {
            return error
        } 
}

function getTaskModelByListID (id) {
    return new Promise(async(resolve, reject) => {
        try {

            const posts = await Task.find({listID: id});

            resolve(posts);
        } catch (error) {
            reject(error);
        } 
    }); 
}

function getSingleTaskModel(id) {
    return new Promise(async(resolve, reject) => {
        
        try {
            let lists = await Task.find({createdBy: id});
            resolve(lists);
        } catch (error) {
            reject(error);
        } 
    }); 
}

function addTaskModel(task) {
    return new Promise(async(resolve, reject) => {
        
        try {

            const post = await Task.create(task);
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

            const post = await Task.updateOne({_id :id},{ $set: task });
            
            resolve(post);
        } catch (error) {
            reject(error);
        }
    });
}

function deleteTaskModel (id) {

    return new Promise(async(resolve, reject) => {
        try {

            const removed = await Task.deleteOne({_id : id});

            resolve(removed);
        } catch (error) {
            reject(error)
        }
    });
}

function deleteTaskCreatedByModel (id) {

    return new Promise(async(resolve, reject) => {
        try {

            const removed = await Task.deleteMany({createdBy : id});

            resolve(removed);
        } catch (error) {
            reject(error)
        }
    });
}


function clear() {
    Task.deleteMany({}, {multi: true})
}

module.exports = {
    getTaskModel,
    getSingleTaskModel,
    addTaskModel,
    editTaskModel,
    deleteTaskModel,
    clear,
    getTaskModelByListID,
    deleteTaskCreatedByModel
    //taskIsDoneModel
}