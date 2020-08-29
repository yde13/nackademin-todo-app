const { Router } = require("express");

const controller = require('../controllers/taskController');
const { authorization, user, admin } = require('../middlewares/auth')

const router = new Router()


router.get('/get', authorization, user, controller.getTaskController)
//router.get('/posts/:id', controller.getSinglePostController)
router.post('/post', authorization, user, controller.addTaskController)
router.delete('/delete/:id', authorization, admin, controller.deleteTaskController)
router.put('/edit/:id', authorization, user, controller.editTaskController)
//router.put('/task/:id', controller.taskIsDoneController)

module.exports = router