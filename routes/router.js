const express = require('express')
const taskRoute = require('./taskRouter.js')
const userRoute = require('./userRouter.js')

const router = express.Router()

router.use('/', userRoute);
router.use('/', taskRoute); //använd auth



module.exports = router
