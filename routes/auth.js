const router=require('express').Router()
const CONTROLLER=require('../controller/controller')
const verify=require('../authVerify')
const cors=require('cors')
router.post('/signUp',cors(),CONTROLLER.signUp)
router.post('/signIn',cors(),CONTROLLER.signIn)
router.get('/get',verify,CONTROLLER.getUsers)
module.exports=router