import UserModel from "../models/UserModel.js";
export const login = async (req, res) => {

}
export const register = async (req, res) => {
    const {email,username}=req.body;
    try{
        const findExisitingUser=await UserModel.findOne({
            username:username
        });
        if(findExisitingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const user=await UserModel.create({
            email,
            username
        });
        res.status(201).json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
}
}
export const logout = async (req, res) => {

}
export const checkUsername=async(req,res)=>{
 try{
   const {username}=req.params;

   const user =await UserModel.findOne({
       username:username
   });
    if(user){
         res.status(200).json({message:"User already exists"});
    }
    else{
         res.status(200).json({message:"User doesnt exist"});
    }
 }
 catch(err){
    console.log(err);
 }
}
export const getAllUsers=async(req,res)=>{
    try{
        const users=await UserModel.find();
        res.status(200).json(users);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
    }