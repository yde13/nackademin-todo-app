const express = require('express')
const taskRoute = require('./taskRouter.js')
const userRoute = require('./userRouter.js')
const todoListRouter = require('./todoListRouter.js')


const router = express.Router()

router.use('/', userRoute);
router.use('/', taskRoute); //använd auth
router.use('/', todoListRouter)



module.exports = router
