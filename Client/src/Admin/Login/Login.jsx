import React ,{useState}from 'react'
import "./Login.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log(password);
    if (!email || !password) {
      toast.info("email and password required", {
        position: "top-center",
        autoClose: 2000,
      });
    }

    const userData = {
      email,
      password,
    };
    try {
      const response = await axios.post( "http://localhost:4000/admin/login",
        userData,
        {
          withCredentials: true,
        }
      );
  
    if(!response.data.success){
        
        toast.info(response.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
    }
    

      if (response.status === 201) {
        toast.success("login successful! Redirecting to home...", {
          position: "top-left",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
       if (error.response.status === 403){
        toast.info("You are not an Admin", {
            position: "top-center",
            autoClose: 2000,
          });
          return
       }

      toast.error("login failed. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (

    <div className="login-App">
      <h2>Admin Login</h2>

        <div className="input-filed">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
        </div>
        <div className="input-filed">
          <label htmlFor="password" >Password</label>
          <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
        </div>
        <button type="submit" onClick={handleSubmit}  className="button-login">Login</button>
<ToastContainer/>
    </div>
  )
}

export default Login
