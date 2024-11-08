const User = require('../models/signUp');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const authJwt = require('../helper/authjwt'); 


router.post('/signup' , async (req,res)=>{
    const {name , phone , email,password}= req.body;
    try {
       const existingUser = await User.findOne({email : email}) 
       if(existingUser){
        return res.status(400).json({msg:"User Already exist!"})
       }

       const number = await User.findOne({phone : phone}) 
       if(number){
        return res.status(400).json({msg:"Mobile number Already Exists!"})
       }

       const hashPass = await bcrypt.hash(password,10);

    //    const result = await User.create({
    //     name:name,
    //     phone:phone,
    //     email : email,
    //     password : hashPass
    //    })

    let result = new User({
        name:name,
        phone:phone,
        email : email,
        password : hashPass
    })

    await result.save();

    const token = jwt.sign({email:result.email , id: result._id}, process.env.JSON_WEB_TOKEN_SECRET_KEY,{expiresIn: "1h"})
    // console.log(token)

    res.status(201).json({
        user:result,
        token:token
    })

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"something went wrong in signUp!!"})
    }
})

router.post('/signin', async (req,res)=>{
    const {email , password} = req.body

    try {
        const exist = await User.findOne({email:email})
        console.log(exist.password)
        if(!exist){
           return res.status(400).json({msg:"User not Found Please Create New Account!!"})
        }

        const matchPass = await bcrypt.compare(password,exist.password)
        
        if(!matchPass){
            return res.status(400).json({msg:"Invalid credentials!"})
        }

        const token = jwt.sign({email:exist.email , id: exist._id}, process.env.JSON_WEB_TOKEN_SECRET_KEY)

    res.status(201).json({
        user:exist,
        token:token,
        msg:"User Authenticated ! SignIn !"
    })


    
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"something went wrong in signIn!!"})
    }
})

router.get('/',authJwt, async (req,res)=>{
    const user = await User.find();
    if(!user){
        return res.status(404).json({msg:"User Not Found !!"})
    }
    res.status(200).json(user);
})

router.get('/:_id',authJwt, async (req,res)=>{
    const user = await User.findById(req.params);
    if(!user){
        return res.status(404).json({msg:"User Not Found with given Id !!"})
    }
    res.status(200).json(user);
})

router.put("/:_id" , async(req,res)=>{
    const {name , phone , email, password}= req.body;
    const existingUser  = await User.findById(req.params)

    let newPassword = ''

    if(req.body.password){
        newPassword =  bcrypt.hashSync(password,10);
    } else{
        newPassword = existingUser.password
    }

    const usr = await User.findByIdAndUpdate(req.params , {
        name:name,
        phone:phone,
        email : email,
        password : newPassword
    },
    {new:true})

    if(!usr){
        return res.status(400).json({msg : "User Cannot able to Update !"})
    }

    res.send(usr);
})

module.exports = router;