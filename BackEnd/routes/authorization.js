const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const {sequelize}=require("../models/index")
require("dotenv").config

router.get('/',
 async(req,res,next)=>{
  try {
     token = req.headers['authorization'].split(" ")[1];
     decoded = jwt.verify(token,process.env.SECRET);
    req.user = decoded;
    next();
  } catch(err){
    res.status(401).json({"msg":"Un Authorized"});
  }
  },
  async(req,res)=>{
    let user = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
    if(user === null){
      res.status(404).json({'msg':"User not found"});
    }
    res.status(200).json(user);
 }); 
 module.exports = router;