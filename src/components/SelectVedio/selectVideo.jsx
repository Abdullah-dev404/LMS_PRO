import React, { useState } from 'react';
import { CardBody, CardFooter, CardTitle, Container, Card, Button, Form } from 'react-bootstrap';
import { PiUploadSimpleBold } from 'react-icons/pi';
const VideoUploader = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedVideo(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert('Please select a valid video file.');
    }
  };

  //   const handleUpload = async () => {
  //     if (!selectedVideo) {
  //       alert("No video selected!");
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("video", selectedVideo);

  //     try {
  //       setUploadStatus("Uploading...");

  //       // Replace with your API endpoint
  //       const response = await fetch("/api/upload", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (response.ok) {
  //         setUploadStatus("Upload successful!");
  //       } else {
  //         setUploadStatus("Upload failed. Please try again.");
  //       }
  //     } catch (error) {
  //       console.error("Error uploading video:", error);
  //       setUploadStatus("An error occurred during upload.");
  //     }
  //   };

  return (
    <Container>
      <Card
        style={{
          height: '50vh',
          maxHeight: '50vh',
          borderRadius: '10px',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          padding: '25px'
        }}
      >
        <CardTitle style={{ fontWeight: 'bolder' }}> Select Video</CardTitle>
        <CardBody style={{ overflow: 'auto' }}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" accept="video/*" onChange={handleVideoSelect} style={{ marginBottom: '10px' }} />
          </Form.Group>

          {previewUrl && (
            <div style={{ marginBottom: '10px' }}>
              <video src={previewUrl} controls width="30%" height="30%" />
            </div>
          )}
        </CardBody>
        <CardFooter>
          <Button className="mt-3" size="sm" style={{ backgroundColor: '#0000FF', border: '1px solid #0000FF', color: 'white' }}>
            <PiUploadSimpleBold style={{ marginRight: '3px', fontSize: '15px' }} />
            Uplaod video
          </Button>
        </CardFooter>
      </Card>

      {/* {uploadStatus && <p>{uploadStatus}</p>} */}
    </Container>
  );
};

export default VideoUploader;
