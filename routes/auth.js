const router=require('express').Router()
const CONTROLLER=require('../controller/controller')
const cors=require('cors')
router.post('/signUp',cors(),CONTROLLER.signUp)
router.post('/signIn',cors(),CONTROLLER.signIn)
module.exports=router