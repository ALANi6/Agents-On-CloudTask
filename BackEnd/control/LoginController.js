const {sequelize}=require("../models/index");
const bcrypt=require("bcrypt");

function loginController(req, res) {
   
    const { email, password } = req.body;
    if (!email || !password)
      res.status(400).json({ message:"User does not exist" });
    else {
      login(res, email, password);
    }
  }
  
  async function login(res, email, password) {
    const user = await sequelize.models.User.findOne({
      where: { email: email },
    });
    if (!user)
      res.status(400).json({ message: "process.env.wrong_username_or_password" });
    else {
      const match = await bcrypt.compare(password, user.dataValues.password);
  
      if (!match)
        res.status(400).json({ message: "process.env.wrong_username_or_password1112" });
      else {
        // issue token and send it to the user
        const token = await issueToken(username, "24h");
        res.status(200).json({ message: token });
      }
    }
  }
  
  module.exports = {
    loginController,
  };