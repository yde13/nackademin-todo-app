const { Router } = require("express");

const controller = require('../controllers/userController');
const router = new Router()

router.get('/login', controller.getUserController)
router.post('/register', controller.postUserController)
router.put('/editUser/:id', controller.editUserController)
router.delete('/deleteUser/:id', controller.deleteUserController)
module.exports = router