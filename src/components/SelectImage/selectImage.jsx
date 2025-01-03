import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Container, Form } from 'react-bootstrap';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { useLocation } from 'react-router';


function SelectImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageData,SetImageData] = useState([])

  const useQuery = () => new URLSearchParams(useLocation().search)
  const Query = useQuery()
  const section_id = Query.get('sectionId')

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }
  const generateJson = () => {
    if (!selectedImage) {
      alert("Please select an image before saving!");
      return;
    }
    const jsonData = [
      {
        imageId: new Date().getTime().toString(), 
        sectionId:section_id,
        imageName: selectedImage.name,
        imageSize: `${(selectedImage.size / 1024).toFixed(2)}KB`,
        uploadTime: new Date().toLocaleTimeString(),
      },
    ];
}

  return (
    <div
    className="container selectImageModule"
    style={{
      backgroundColor: '#FFFFFF',
      height: 'auto',
      padding: '35px',
      borderRadius: '20px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
    }}
    >
      <h4 className="mb-3" style={{fontWeight:"bolder"}}>Select Image</h4>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>
      {preview && (
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <img src={preview} alt="preview" style={{ width: '20vw', height:"20vh", marginTop: '20px' }} />
        </div>
      )}

      <Button className="mt-3" size="sm" onClick={generateJson} style={{backgroundColor:"#0000FF",border:"1px solid #0000FF", color:"white"}} >
        <PiUploadSimpleBold style={{marginRight:'3px',fontSize:"15px"}}/>
        Uplaod Image
      </Button>
    </div>
  );
}

export default SelectImage;
