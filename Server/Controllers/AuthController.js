import User from '../Models/Usermodel.js'
import { createSecretToken } from '../Util/Secrettocken.js';
import bcrypt from "bcryptjs"
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
export const Signup = async (req, res, next) => {
  try {
    const { email, password, username,image, createdAt } = req.body;
   
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username,image, createdAt });
    const token = createSecretToken(user._id);
 
    res.cookie("token", token,{
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  
 
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token",token,{
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
    
  } catch (error) {
    console.error(error);
  }
}

export const Getdata = async (req, res) => {
  try {

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const userData = await User.findById(decoded.id);

  
  
    if (userData) {
      res.status(201).json({ msg: "success", userData });
    }
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired token. Please login again." });
  }
};

export const Edituser=async(req,res)=>{
try {
   const token=req.cookies.token
    const userId=jwt.verify(token,process.env.TOKEN_KEY).id
    const { username, email, image } = req.body; // Updated fields from the frontend

    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, image },
      { new: true, runValidators: true } // Return updated document and run validations
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
    

} catch (error) {
  return res
  .status(403)
  .json({ message: "Invalid or expired token. Please login again." });
}
}