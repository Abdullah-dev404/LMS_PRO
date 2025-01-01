import React,{useState} from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { IoIosAddCircle } from 'react-icons/io';
import { MdOutlineQuiz } from 'react-icons/md';
import { FaRegImage } from 'react-icons/fa';
import { CiText } from 'react-icons/ci';
import Quiz from 'views/quiz/quiz';
import SelectImage from 'components/SelectImage/selectImage';
import TextEditor from 'components/TextEditor/texteditor';
import SelectVideo from 'components/SelectVedio/selectVideo';
import { MdOutlineVideoLibrary } from 'react-icons/md';

function TemplateFour() {
    const [show, setShow] = useState(false);
  const [activityType, setActivityType] = useState("");
  const [boxActivity, setBoxActivity] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (box) => {
    setShow(true);
    setActivityType(box);
  };

  const saveActivityType = (type) => {
    setBoxActivity((prev) => ({
      ...prev,
      [activityType]: type,
    }));
    handleClose();
  };

  const renderContent = (box) => {
    switch (boxActivity[box]) {
      case "video":
        return <SelectVideo/>;
      case "image":
        return <SelectImage/>
      case "text":
        return <TextEditor/>
      default:
        return (
          <Button
            onClick={() => handleShow(box)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#0000FF',
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
        <Col sm={12} md={4}>
          <Card
            style={{
              height: '50vh',
              maxHeight:'50vh',
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
          >
            <Card.Header className='cardHeader'>
              <b >Box One</b>
            </Card.Header>
            <Card.Body
             style={{
              overflowY: 'auto', 
            }}
            >{renderContent("box1")}</Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={4}>
        <Card
            style={{
              height: '50vh',
              maxHeight:'50vh',
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
          >
            <Card.Header className='cardHeader'>
              <b >Box Two</b>
            </Card.Header>
            <Card.Body
             style={{
              overflowY: 'auto', 
            }}
            >{renderContent("box2")}</Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={4}>
          <Card
            style={{
              height: '50vh',
              maxHeight:'50vh',
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
          >
            <Card.Header className='cardHeader'>
              <b >Box Three</b>
            </Card.Header>
            <Card.Body
             style={{
              overflowY: 'auto', 
            }}
            >{renderContent("box3")}</Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --------------------------------Modal-------------------- */}
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
                  style={{ fontSize: '30px', color: '#D92165', cursor: 'pointer' }}
                />
                <div>
                  <b
                    onClick={() => saveActivityType('video')}
                    style={{ color: '#D92165', fontSize: '15px', cursor: 'pointer' }}
                  >
                    Video
                  </b>
                </div>
              </div>
            </Col>
            <Col xs={4} md={4} className="d-flex flex-column align-items-center justify-content-center ">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <FaRegImage
                  onClick={() => saveActivityType('image')}
                  style={{ fontSize: '30px', color: '#235990', cursor: 'pointer' }}
                />
                <div>
                  <b
                    onClick={() => saveActivityType('image')}
                    style={{ color: '#235990', fontSize: '15px', cursor: 'pointer' }}
                  >
                    Images
                  </b>
                </div>
              </div>
            </Col>
            <Col xs={4} md={4} className="d-flex flex-column align-items-center justify-content-center ">
              <div>
                <CiText
                  onClick={() => saveActivityType('text')}
                  style={{ fontSize: '30px', color: '#5A5B96', cursor: 'pointer' }}
                />
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <b
                    onClick={() => saveActivityType('text')}
                    style={{ color: '#5A5B96', fontSize: '15px', cursor: 'pointer' }}
                  >
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

export default TemplateFour;