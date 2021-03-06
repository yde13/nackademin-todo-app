const model = require('../models/todoListModel');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()

async function getTodoListController(req, res) {


    let todoList = await model.getTodoListModel()

    res.json(todoList)
}

async function getSingleTodoListController(req, res) {

    let id = req.params.id


    let todoList = await model.getSingleTodoListModel(id)
    
    res.json(todoList)
}

function addTodoListController(req, res) {

    try {
        let todoList = {
            title: req.body.title,
            listID: req.body.listID,
            createdBy: req.user.id
        }
        console.log(req.user);
        


        let result = model.addTodoListModel(todoList)
        res.json(todoList)

    } catch (error) {
        res.json({ error: error.message })
    }

}

function editTodoListController(req, res) {

    try {
        var id = req.params.id;

        let todoList = {
            title: req.body.title
        }

        let updatedTodoList = model.editTodoListModel(id, todoList)
        
        res.json(JSON.stringify(updatedTodoList));
    } catch (error) {
        res.json({ error: error.message })
    }
}

function deleteTodoListController(req, res) {
    try {
        let id = req.params.id;
        let deletedList = model.deleteTodoListModel(id)
        res.json({ data: deletedList })
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    getTodoListController,
    getSingleTodoListController,
    addTodoListController,
    editTodoListController,
    deleteTodoListController
}