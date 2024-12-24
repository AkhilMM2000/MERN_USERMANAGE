import { Login} from "../Controllers/AdmController.js";
import express from "express";
import {verifyToken} from '../Middlewares/Authmiddleware.js'
const Admroute = express.Router();

Admroute.post('/login',Login)
export default Admroute