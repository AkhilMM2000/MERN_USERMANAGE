import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate=useNavigate()
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(e.target.files[0]);
    }
  };

const uploadimage=async()=>{
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "usermanagement"); 
   formData.append('cloud_name','dcoo56p7a')
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dcoo56p7a/image/upload",
          formData
        );
  if(response.status==200){
    const imageUrl = response.data.secure_url; // Get secure URL of the uploaded image
    return imageUrl
  }
      } catch (error) {
         alert(error)
      }

}

  const handleSubmit =async(e) => {
    e.preventDefault();
    if (!username || !email || !password || !image) {
      alert("please upload all the fields"); return 
    }
    const nameregex= /^[A-Za-z ]+$/;
    const emailregex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordregex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;

    if (!nameregex.test(username)||!emailregex.test(email)||!passwordregex.test(password)){
      alert('validation failed')
      return 
    }

  
const imageUrl=await uploadimage()
console.log(imageUrl,'this is your imageurl ');
 const userData={
  username,
  email,
  password,
  image:imageUrl
 }
 
 try {

  const response = await axios.post('http://localhost:4000/signup', userData, {
    withCredentials: true, // Allow sending cookies
  });
 console.log(response.status);
 
  if (response.status ===201) {
 
    toast.success('Signup successful! Redirecting to login...', {
      position: "top-center",
      autoClose: 2000, 
    });
    setTimeout(() => {
      navigate('/login');
    }, 2000); 
  }
} catch (error) {

  console.error('Signup failed:', error);
  toast.error('Signup failed. Please try again.', {
    position: "top-center",
    autoClose: 2000,
  });
}
}
  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="image-upload-container">
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-image" />
            ) : (
              <div className="image-placeholder">
                <span>Upload Image</span>
              </div>
            )}
          </label>
        </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

        <button
            type="submit"
            onClick={handleSubmit}
            className="upload-btn"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload and Submit"}
          </button>
      
      </div>
      <ToastContainer/>
    </div>
  );
};

export default SignUp;
