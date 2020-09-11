const express = require('express')
const taskRoute = require('./taskRouter.js')
const userRoute = require('./userRouter.js')
const todoListRouter = require('./todoListRouter.js')
const gdprRouter = require('./gdprRouter')

const router = express.Router()

router.use('/', userRoute);
router.use('/', taskRoute); //använd auth
router.use('/', todoListRouter)
router.use('/', gdprRouter)



module.exports = router
