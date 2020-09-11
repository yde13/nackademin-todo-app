const { Router } = require("express");
const { authorization, user, admin } = require('../middlewares/auth')


const controller = require('../controllers/userController');
const router = new Router()

router.post('/users', controller.getUserController)
router.post('/user', controller.postUserController)
router.put('/user/:id', controller.editUserController)
router.delete('/user/:id', authorization, admin, controller.deleteUserController)
module.exports = router