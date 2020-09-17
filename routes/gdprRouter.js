const { Router } = require("express");

const controller = require('../controllers/gdprController');
const { authorization, user, admin, loggedInPerson, loggedInPersonOrAdmin } = require('../middlewares/auth')

const router = new Router()


router.get('/gdpr',  authorization, admin, controller.getGdprController)
router.get('/gdpr/:id', authorization, loggedInPersonOrAdmin, controller.getSingleGdprController)// loggedInPerson,
// router.post('/gdpr', controller.addTaskController)
router.delete('/gdpr/:id', authorization, loggedInPersonOrAdmin, controller.deleteGdprController) 
// router.put('/gdpr/:id', controller.editTaskController)
//router.put('/task/:id', controller.taskIsDoneController)

module.exports = router