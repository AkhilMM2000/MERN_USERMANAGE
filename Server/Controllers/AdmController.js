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
  