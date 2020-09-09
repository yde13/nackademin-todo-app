const { Router } = require("express");

const controller = require('../controllers/todoListController');
// const { authorization, user, admin } = require('../middlewares/auth')

const router = new Router()


router.get('/todoList',   controller.getTodoListController) //authorization, user
router.get('/todoList/:id', controller.getSingleTodoListController)
router.post('/todoList', controller.addTodoListController)
router.delete('/todoList/:id',  controller.deleteTodoListController)
router.put('/todoList/:id', controller.editTodoListController)
//router.put('/task/:id', controller.taskIsDoneController)

module.exports = router