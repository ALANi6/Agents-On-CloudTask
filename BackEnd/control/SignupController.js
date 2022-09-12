const {sequelize} = require("../models/index");
const bcrypt = require("bcrypt");

function Signupcontrol(req, res) {
   
    const { first_name, last_name, email, password } = req.body;
    if (!first_name && last_name || !email || !password)
      res.status(400).json({ message:"User does not registration" });
    else {
       signup(req, first_name , last_name, email, password);
    }
  }

  async function signup(req, first_name , last_name, email, password) {
    const user = await sequelize.models.User.findOne({
        where: { email: email },
      });
      if(!user){
        const user= await sequelize.module.User.Create({
          first_name,
          last_name,
          email,
          password
        })
    res.status(201).json({message:"created_user"});
      }
  }
  
  module.exports = {
    Signupcontrol,
  };