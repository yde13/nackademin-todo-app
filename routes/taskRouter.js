const { Router } = require("express");

const controller = require('../controllers/taskController');
const { authorization, user, admin } = require('../middlewares/auth')

const router = new Router()


router.get('/task',   controller.getTaskController) //authorization, user
//router.get('/posts/:id', controller.getSinglePostController)
router.post('/task', authorization, user, controller.addTaskController)
router.delete('/task/:id', authorization, admin, controller.deleteTaskController)
router.put('/task/:id', authorization, user, controller.editTaskController)
//router.put('/task/:id', controller.taskIsDoneController)

module.exports = router