const User=require('../model/user')
const joi=require('@hapi/joi')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
exports.signUp=async (req,res)=>{
    const emailExist= await User.findOne({email:req.body.email})

    if(emailExist){
        res.status(400).send("email id already exist")
        return;
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        password:hashedPassword
    })

    try{
        const signUpSchema=joi.object({
            name:joi.string().min(3).max(255).required(),
            email:joi.string().min(3).max(255).required().email(),
            address:joi.string().min(8).max(255).required(),
            password:joi.string().min(3).max(255).required()

        })
        const {err}=await signUpSchema.validateAsync(req.body)

        if(err){
            res.status(400).send(err.details[0].message)
            return;
        }
        else{
            const saveUser=await user.save()
            res.status(200).send("User created successfully")
        }

    }
    catch(err){
        res.status(500).send(err)

    }
}

exports.signIn= async (req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Inncorect Email Id")
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)

    const validatePassword= await bcrypt.compare(req.body.password,user.password)
    if(!validatePassword) return res.status(400).send("Inccorect password")

    try{
        const loginSchema=joi.object({
            email:joi.string().min(3).max(255).required().email(),
            password:joi.string().min(5).max(50).required()
        })
        const {err}= await loginSchema.validateAsync(req.body)
        if(err) return res.status(400).send(err.details[0].mesage)
        else{
            const token=jwt.sign({id:user._id},process.env.TOKEN_SECRET)
            res.send(token)
            res.send("Logged Successfully")
        }

    }catch(err){
        res.status(500).send(err)

    }

}
exports.getUsers=async (req,res)=>{
        try{
            const allUser=await User.find()
            res.status(200).send(allUser)

    }catch(err)
    {
        res.status(500).send(err)
    }
}