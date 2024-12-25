import { Login,Getallusers,Edituserdata,deleteUser} from "../Controllers/AdmController.js";
import express from "express";
import {Adminverify} from '../Middlewares/Authmiddleware.js'
const Admroute = express.Router();

Admroute.post('/login',Login)
Admroute.get('/getusers',Adminverify,Getallusers)
Admroute.patch('/edituser/:userid',Adminverify,Edituserdata)
Admroute.delete('/deleteuser/:userid',Adminverify,deleteUser)
export default Admroute