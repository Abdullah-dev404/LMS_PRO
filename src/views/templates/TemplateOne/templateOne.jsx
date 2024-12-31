import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { MdOutlineQuiz } from 'react-icons/md';
import { FaRegImage } from 'react-icons/fa';
import { CiText } from 'react-icons/ci';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import Quiz from 'views/quiz/quiz';
import SelectImage from 'components/SelectImage/selectImage';
import TextEditor from 'components/TextEditor/texteditor';
import SelectVideo from 'components/SelectVedio/selectVideo';
import './templateOne.css';

function TemplateOne() {
  const [show, setShow] = useState(false);
  const [activityType, setActivityType] = useState('');
  const [boxActivity, setBoxActivity] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (box) => {
    setShow(true);
    setActivityType(box);
  };

  const saveActivityType = (type) => {
    setBoxActivity((prev) => ({
      ...prev,
      [activityType]: type
    }));
    handleClose();
  };

  const renderContent = (box) => {
    switch (boxActivity[box]) {
      case 'video':
        return <SelectVideo />;
      case 'image':
        return <SelectImage />;
      case 'text':
        return <TextEditor />;
      default:
        return (
          <Button
            onClick={() => handleShow(box)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#0000FF'
            }}
          >
            <IoIosAddCircle style={{ fontSize: '20px', marginRight: '5px' }} />
            <b>Add Content Type</b>
          </Button>
        );
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} sm={12}>
          <Card
            style={{
              height: '70vh',
              maxHeight: '70vh',
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }}
          >
            <Card.Header className="cardHeader">
              <b>Box One</b>
            </Card.Header>
            <Card.Body
              style={{
                overflowY: 'auto',
                maxHeight: 'calc(70vh - 50px)'
              }}
            >
              {renderContent('box1')}
            </Card.Body>
          </Card>
        </Col>

        {/* ________________________ Col TWO __________________ */}
        <Col md={6} sm={12}>
          <Card
            md={12}
            style={{
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              height: '32vh',
              maxHeight: '32vh'
            }}
          >
            <Card.Header>
              <b style={{ color: '#3F4D67', fontSize: '15px' }}>Box Two</b>
            </Card.Header>
            <Card.Body
              style={{
                overflow: 'auto'
              }}
            >
              {renderContent('box2')}
            </Card.Body>
          </Card>

          <Card
            md={12}
            style={{
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              minHeight: '33vh',
              maxHeight: '33vh'
            }}
          >
            <Card.Header>
              <b style={{ color: '#3F4D67', fontSize: '15px' }}>Box Three</b>
            </Card.Header>
            <Card.Body
              style={{
                overflow: 'auto'
              }}
            >
              {renderContent('box3')}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ----------------------Modal--------------------- */}

      <Modal
        show={show}
        onHide={handleClose}
        className="activityTypeModal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '20px', fontWeight: 'bolder' }}>Add Activity Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="activities">
            <Col xs={4} md={4} className="d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <MdOutlineVideoLibrary
                  onClick={() => saveActivityType('video')}
                  style={{ fontSize: '30px', color: '#FF0033', cursor: 'pointer' }}
                />
                <div>
                  <b onClick={() => saveActivityType('video')} style={{ color: '#FF0033', fontSize: '15px', cursor: 'pointer' }}>
                    Video
                  </b>
                </div>
              </div>
            </Col>
            <Col xs={4} md={4} className="d-flex flex-column align-items-center justify-content-center ">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <FaRegImage onClick={() => saveActivityType('image')} style={{ fontSize: '30px', color: '#235990', cursor: 'pointer' }} />
                <div>
                  <b onClick={() => saveActivityType('image')} style={{ color: '#235990', fontSize: '15px', cursor: 'pointer' }}>
                    Images
                  </b>
                </div>
              </div>
            </Col>
            <Col xs={4} md={4} className="d-flex flex-column align-items-center justify-content-center ">
              <div>
                <CiText onClick={() => saveActivityType('text')} style={{ fontSize: '30px', color: '#5A5B96', cursor: 'pointer' }} />
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <b onClick={() => saveActivityType('text')} style={{ color: '#5A5B96', fontSize: '15px', cursor: 'pointer' }}>
                    Text
                  </b>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} style={{ backgroundColor: '#43C9A2' }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TemplateOne;
