import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card } from 'react-bootstrap';
import courses from '../questions/config/courses.json';
import Button from 'react-bootstrap/Button';
import './index.css';
import ai_image from '../../assets/images/courses/ai_course.jpg';

const DashDefault = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Row>
        <Col className="text-end mb-4">
          <Button variant="outline-primary" onClick={handleShow}>
            <i className="feather icon-plus" />
            Add course
          </Button>
        </Col>
      </Row>
      <Row>
        {courses.map((course) => (
          <Col key={course.id} lg={2} xl={6} xxl={3} md={3}>
            <Card>
              <Card.Img variant="top" src={ai_image} />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>By {course.author}</Card.Text>
                <div className="button">
                  <button
                    className="more_info_button"
                    onClick={() => {
                      window.open(`http://localhost:3000/app/course-content?courseId=${course.id}`, '_blank');
                    }}
                  >
                    more info
                    <i className="feather icon-arrow-right m-2"></i>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="courseTitle">
                <Form.Label>Course Title</Form.Label>
                <Form.Control type="text" placeholder="Enter course title" autoFocus />
              </Form.Group>
              <Form.Group className="mb-3" controlId="authorName">
                <Form.Label>Author Name</Form.Label>
                <Form.Control type="text" placeholder="Enter author name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="courseImage">
                <Form.Label>Select Image</Form.Label>
                <Form.Control type="file" accept="image/*" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
};

export default DashDefault;
