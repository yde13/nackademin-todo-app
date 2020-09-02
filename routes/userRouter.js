const { Router } = require("express");

const controller = require('../controllers/userController');
const router = new Router()

router.get('/user', controller.getUserController)
router.post('/user', controller.postUserController)
router.put('/user/:id', controller.editUserController)
router.delete('/user/:id', controller.deleteUserController)
module.exports = router