const mongoose=require("mongoose");
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    userName:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true}
},{timestamps:true})

//hash password before saving because here that is easy to manage

userSchema.pre('save', async function (next) 
{
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password, 10)
    return next()
    
})

const UserModel=mongoose.models.user || mongoose.model('user', userSchema)
module.exports=UserModel