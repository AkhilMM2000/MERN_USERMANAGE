import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
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
      const response = await axios.post( "http://localhost:4000/login",
        userData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("login successful! Redirecting to home...", {
          position: "top-left",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("login failed. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
