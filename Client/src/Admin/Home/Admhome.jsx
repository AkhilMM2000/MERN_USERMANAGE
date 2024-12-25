import React ,{useState,useEffect}from "react";
import { Row, Col, Card, Button ,Modal,Form} from "react-bootstrap";
import "./Admin.css";
import {useDispatch,useSelector} from 'react-redux'

import { addallusers,searchUser,editOneuser,deleteoneuser} from '../../Store/Adminaction';
import axios from "axios";
import { toast,ToastContainer} from 'react-toastify'
function Admhome() {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [email, setEmail] = useState('');
      const [username, setUsername] = useState('');
      const [image, setImage] = useState(null);
      const [currentImage, setCurrentImage] = useState(null);
      const [currentEditUser,setCurrentedit]=useState('')
      const [showadduser,setaddmodal]=useState(false)
      const[password,setPassword]=useState('')
      const [newimage,setNewimage]=useState(null)
      const Addnewimageuser=(e)=>{
        const file = e.target.files[0];
        if (file) {
          setNewimage(e.target.files[0]);
        }
      }
      const handleImageUpload = (e)=>{
        const file = e.target.files[0];
        if (file) {
          setImage(e.target.files[0]);
        }
      };
    const dispatch=useDispatch()
    const handleCloseModal = () =>{
      setUsername('')
      setEmail('')
        setShowModal(false);
      
      };
      const allusers=useSelector((store)=>store.adminside.usermanage)

    
      const handleEditClick = (userdata) => {
    
        setShowModal(true);
      
         setEmail(userdata.email)
        setImage(userdata.image)
         setUsername(userdata.username)
        setCurrentImage(userdata.image)
        setCurrentedit(userdata._id)
      };
     
      useEffect(() =>{
        const fetchUserData = async () =>{
          try {
            if (! allusers||  allusers.length === 0) { 
              const response = await axios.get("http://localhost:4000/admin/getusers", {
                withCredentials: true,
              });
              const userdetails = response.data.allusers
             
              dispatch(addallusers(userdetails))
            }
          } catch (err) {
            console.log(err);
          }
        };
        fetchUserData();
      }, [dispatch]);


      useEffect(() => {
        if (searchTerm.length !== 0) {
          dispatch(searchUser(searchTerm));
        } else {
      
          dispatch(searchUser(""));
        }
      }, [searchTerm,dispatch]);

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

      const handleUserEdit=async(e)=>{
        e.preventDefault();

 const nameregex= /^[A-Za-z ]+$/;
    const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/;

    if (!nameregex.test(username)||!emailregex.test(email)){
      toast.info("check your credentials  ", {
            position: "top-center",
            autoClose: 2000,
          });
      return 
    }

const imageUrl=await uploadimage(image)

console.log(email,username,currentEditUser);
 const editUserdata={
  username,
  email,
  image:imageUrl
 }

       try {
        const response = await axios.patch(`http://localhost:4000/admin/edituser/${currentEditUser}`, editUserdata, {
          withCredentials: true, 
        });
        if(response.status==201){
          
          const updateuser=response.data.edituser
          dispatch(editOneuser(updateuser))
          toast.success("successfully updated user", {
            position: "top-center",
            autoClose: 1500,
          });
          setShowModal(false);
        }


       } catch (error) {
         console.log(error);
            toast.error(error,{
              position: "top-center",
              autoClose: 2000,
            });
       }

      }

const handleDelete=async(userid)=>{
  dispatch(deleteoneuser(userid))
   try {
    const response = await axios.delete(`http://localhost:4000/admin/deleteuser/${userid}`, {
      withCredentials: true, 
    });
  
     if(response.status==201){
   
      toast.success(response.data.message,{
        position: "top-center",
        autoClose: 2000,
      });

     }


   } catch (error) {
     console.log(error);
        toast.error(error,{
          position: "top-center",
          autoClose: 2000,
        });
   }
  
}
 const closeadduser=()=>{
     setaddmodal(false)
 }
///Add new user function below-----------------------------
 const handleAdduser=(e)=>{
  e.preventDefault()
  if (!username || !email || !password || !image) {
    toast.error("upload all the fields ",{
      position: "top-center",
      autoClose: 2000,
    });
    
    return 
  }
  const nameregex= /^[A-Za-z ]+$/;
  const emailregex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordregex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;

  if (!nameregex.test(username)||!emailregex.test(email)||!passwordregex.test(password)){
    toast.error("validation failed ",{
      position: "top-center",
      autoClose: 2000,
    });
    return 
  }
    
    
 }
   
  return (
    <>
      {/* Logout Button */}
      <div className="logout-container">
        <Button variant="danger" size="sm">Logout</Button>
      </div>
<input type="text" placeholder="search" className="search"  value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
<Button 
    variant="success" 
    size="sm" 
    className="add-user-button"
   onClick={()=>setaddmodal(true)}
  >
    Add New User
  </Button>
      {/* Cards in a Row */}
      <Row className="card-row" >
      {allusers.map((user) => (
          <Col  md={3} className="card-column" key={user._id}>
            <Card className="user-card">
              <Card.Img variant="top" src={user.image} className="card-image" />
              <Card.Body>
                <Card.Title className="card-title">{user.username}</Card.Title>
                <Card.Text className="card-text">{user.email}</Card.Text>
                <div className="button-group">
                  <Button  variant="primary"
                    size="sm"
                    onClick={()=> handleEditClick(user)}>Edit</Button>
              <Button variant="danger" onClick={()=>handleDelete(user._id)} size="sm" className="ml-2 custom-margin-right">
  Delete
     </Button>

                </div>
              </Card.Body>
            </Card>
            
        
          </Col>
  ))}
       
      </Row>
          {/* edit modal is below */}

      <Modal  show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
 <div className="modal-input-group">
   <div className="input-field">
     <label>Username</label>
     <input 
       type="text"
    value={username}
    onChange={(e)=>setUsername(e.target.value)}
     />
   </div>

   <div className="input-field">
     <label>Email</label>
     <input
       type="email" 
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
     />
   </div>
   <input
            type="file"
            accept="image/*"
            id="image-upload"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
           
           <label htmlFor="image-upload">
          {image ? (
            // Show uploaded image or existing image
            <img
              src={
                typeof image === "string"
                  ? image // Existing image URL
                  : URL.createObjectURL(image) // Newly uploaded image
              }
              alt="Uploaded"
              className="uploaded-image"
            />
          ) : (
            // Placeholder for image upload
            <div className="image-placeholder">
              <span>Upload Image</span>
            </div>
          )}
        </label>

 </div>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUserEdit}   >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

{/* adduser modal*************************************************  */}
<Modal show={showadduser} onHide={closeadduser} >
      <Modal.Header closeButton>
        <Modal.Title>ADD NEW USER</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="form-group">
  <label htmlFor="formUsername">Username</label>
  <input 
  onChange={(e)=>setUsername(e.target.value)}
    type="text" 
    id="formUsername" 
    className="form-control" 
    placeholder="Enter username" 
  />
</div>

<div className="form-group">
  <label htmlFor="formEmail">Email address</label>
  <input 
    type="email" 
    id="formEmail" 
    className="form-control" 
    placeholder="Enter email" 
    onChange={(e)=>setEmail(e.target.value)}
  />
</div>

<div className="form-group">
  <label htmlFor="formPassword">Password</label>
  <input 
  onChange={(e)=>setPassword(e.target.value)}
    type="password" 
    id="formPassword" 
    className="form-control" 
    placeholder="Enter password" 
  />
</div>

<div className="form-group">
  <label htmlFor="formImage">Profile Image</label>
  <input
            type="file"
            accept="image/*"
            id="image-upload"
            onChange={Addnewimageuser}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload">
            {newimage ? (
              <img src={URL.createObjectURL(newimage)} alt="Uploaded" className="uploaded-image" />
            ) : (
              <div className="image-placeholder">
                <span>Upload Image</span>
              </div>
            )}
          </label>
</div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"  >
          Close
        </Button>
        <Button variant="primary" onClick={handleAdduser}  >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

      <ToastContainer/>
    </>
  );
};

export default Admhome
