const express =require('express');
const bcrypt =require('bcrypt');
const UserModel = require('../model/UserModel');
const jwt = require("jsonwebtoken")
const router = express.Router();

router.post("/signup", async (req, res) => {
try {
   const {email,password,confirmPassword}=req.body;
   console.log(req.body)
   if(password!==confirmPassword) {

      res.status(400).json({message:"password should be matches to confirm password"});

   }
const hashedPassword = await bcrypt.hash(password,10);
const user =new UserModel({email,password:hashedPassword});
 await user.save();
res.status(200).json({message: "registration successful",user})

} catch (error) {
   res.status(500).json({ error: error.message });
}

})

router.post("/login", async (req, res) => {
   try {
   const {email,password} = req.body;
   console.log(req.body)
   const user = await UserModel.findOne({email});
   console.log(user,"user")
if(!user){
   res.status(403).json({message:"User with email not found"});
}
   const decoded =await bcrypt.compare(password,user.password );
console.log(decoded,"decoded")
if(!decoded){
   res.status(403).json({message:"Invalid password"});
}
 const token = jwt.sign(user,"mock_5")
 res.status(200).json({message:"Login successful",token});
   } catch (error) {
      res.status(500).json({ error: error.message });
   }

})
module.exports =router;