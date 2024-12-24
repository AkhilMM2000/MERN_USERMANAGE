import User from "../Models/Usermodel.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token found. Please login.' });
  }

  try {

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    

    req.user = decoded; 
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Invalid or expired token. Please login again.' });
  }
};






// export const userVerification = (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ status: false });
//   }
//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
  
//     if (err) {
//       return res.json({ status: false });
//     } else {
//       const user = await User.findById(data.id);
//       if (user) return res.json({ status: true, user: user.username });
//       else return res.json({ status: false });
//     }
//   });
// };

