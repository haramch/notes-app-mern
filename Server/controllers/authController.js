const UserModel=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const signup=async(req, res)=>
{

    try {
        const {userName, email, password}=req.body;
        if(!userName || !email || !password)
        {
            return res.status(400).json({message:"All fields are required"})
        }
        const existingUser=await UserModel.findOne({email});
        if(existingUser) return res.status(400).json({message:"user already exists"})
        const newUser=await UserModel.create({userName, email, password})
        const token=jwt.sign({id:newUser._id},"secret-key", {expiresIn:"1d"})
        res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error", error:error.message})
    }
}
 const login=async(req, res)=>
{

    try {
        const {email, password}=req.body;
        const user=await UserModel.findOne({email});
        if(!user) return res.status(400).json({message:"user does not exist"})
        const validPass= await bcrypt.compare(password, user.password)
        if(!validPass) return res.status(400).json({message:"Password does not match"})
            const token = jwt.sign({id:user._id}, "secret-key", {expiresIn:"1d"})
         res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
    } catch (error) {
        res.status(500).json({message:"server error", error:error.message})
    }
}
module.exports = { signup, login };