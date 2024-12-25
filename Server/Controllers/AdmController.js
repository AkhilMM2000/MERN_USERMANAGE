import User from '../Models/Usermodel.js'
import { createSecretToken } from '../Util/Secrettocken.js';
import bcrypt from "bcryptjs"
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
    
      console.log(req.body);
      
      const user = await User.findOne({ email });
      if(!user){
     return res.json({message:'Incorrect password or email',success:false}) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
      if(!user.admin){
        
        return res.status(403).json({ message: 'You are not an admin' });
      }
       
       const token = createSecretToken(user._id);
       res.cookie("admintoken",token,{
         withCredentials: true,
         httpOnly: false,
       });
       return res.status(201).json({ message: "User logged in successfully", success: true });
      
    } catch (error) {
      console.error(error);
    }

  }

  export const Getallusers = async (req, res) => {
    try {
      const allusers = await User.find();
      res.status(200).json({ allusers }); 
    } catch (error) {
      console.error('Error fetching users:', error); 
      res.status(500).json({ message: 'Failed to fetch users' }); 
    }
  };

  export const Edituserdata=async(req,res)=>{
        try {
          const userId=req.params.userid
          const { username, email, image } = req.body;
           
          console.log(req.body,userId);
       
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email, image },
            { new: true, runValidators: true } // Return updated document and run validations
          );
          console.log(updatedUser);
        
       res.status(201).json({edituser:updatedUser})
          
        } catch (error) {
          console.log(error);
          
          return res
  .status(403)
  .json({ message: "Invalid or expired token. Please login again." });
        }

  }
  
  export const deleteUser=async(req,res)=>{
    try {
      const userId=req.params.userid
    
       const deleteduser=await User.findByIdAndDelete(userId)
      if(deleteduser){

        return res.status(201).json({message:"succesfully deleted user", success: true})
      }else{
        res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while deleting the user', 
        error: error.message 
      });
    }
  }
  