import User from "../models/User.js";
import bcrypt from 'bcryptjs';


export const updateUser = async (req, res)=>{
    try{
        const updatedUser = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},
         {new: true});
        res.status(200).json(updatedUser);
     }catch(err){
       res.status(500).json(err);
     }
}

export const deleteUser = async (req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!");
     }catch(err){
       res.status(500).json(err);
     }
}

export const getallUser = async (req, res, next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
     }catch(err){
       next(err)
     }
}