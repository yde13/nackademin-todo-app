const { Router } = require("express");

const controller = require('../controllers/todoListController');
const { authorization, user, admin } = require('../middlewares/auth')

const router = new Router()


router.get('/todoList',  authorization, user, controller.getTodoListController) //authorization, user
router.get('/todoList/:id', authorization, user, controller.getSingleTodoListController)
router.post('/todoList', authorization, user, controller.addTodoListController)
router.delete('/todoList/:id', authorization, admin, controller.deleteTodoListController)
router.put('/todoList/:id', authorization, user, controller.editTodoListController)
//router.put('/task/:id', controller.taskIsDoneController)

module.exports = router