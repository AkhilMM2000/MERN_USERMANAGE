import React ,{useState}from "react";
import { Row, Col, Card, Button ,Modal} from "react-bootstrap";
import "./Admin.css";

function Admhome() {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
      };
      const handleEditClick = () => {
      
        setShowModal(true);
      };
  return (
    <>
      {/* Logout Button */}
      <div className="logout-container">
        <Button variant="danger" size="sm">Logout</Button>
      </div>

      {/* Cards in a Row */}
      <Row className="card-row">
      
          <Col  md={3} className="card-column">
            <Card className="user-card">
              <Card.Img variant="top" src="https://res.cloudinary.com/dcoo56p7a/image/upload/v1735049541/j1pilfx7myp4fimaemdu.webp" className="card-image" />
              <Card.Body>
                <Card.Title className="card-title">Username: akhil</Card.Title>
                <Card.Text className="card-text">Email:manoj</Card.Text>
                <div className="button-group">
                  <Button  variant="primary"
                    size="sm"
                    onClick={ handleEditClick}>Edit</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
       
      </Row>
          {/* edit modal is below */}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
 <div className="modal-input-group">
   <div className="input-field">
     <label>Username</label>
     <input 
       type="text"
    
     />
   </div>

   <div className="input-field">
     <label>Email</label>
     <input
       type="email" 
     />
   </div>

   <div className="input-field">
     <label>Profile Image</label>
     <input
       type="file"
       accept="image/*"
      style={{display:"none"}}
      
     />
   </div>
     <div className="image-preview">
       <img 
         src='https://res.cloudinary.com/dcoo56p7a/image/upload/v1735049541/j1pilfx7myp4fimaemdu.webp'
         alt="Preview" 
         style={{width: '200px', height: '200px', objectFit: 'cover'}}
       />
     </div>

 </div>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary"  >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Admhome
