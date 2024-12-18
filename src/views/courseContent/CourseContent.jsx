/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlineQuiz } from 'react-icons/md';
import { MdOndemandVideo } from 'react-icons/md';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MdModeEdit } from 'react-icons/md';
import './CourseContent.css';
import { useLocation } from 'react-router-dom';
import modules from '../questions/config/modules.json';
import { useToast } from 'react-toastify';
const CourseContent = () => {
  const [moduleList, setModuleList] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const course_id = query.get('courseId');

  const [activeKeys, setActiveKeys] = useState(moduleList.map((_, index) => index.toString()));
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);
  const [newModuleName, setNewModuleName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [moduleId,setModuleId]= useState("")
  const [quizData, setQuizData] = useState([])

  const storedData = localStorage.getItem("quiz")
  const parsedData = JSON.parse(storedData)
  // setQuizData(parsedData)
  // console.log(quizData)

// const getDataFromLocalStorage = () => {
//   const storedData = localStorage.getItem("quiz")
//   if (storedData) {
//     try {
//        const parsedData = JSON.parse(storedData)
//       // setQuizData(parsedData);

//     } catch (error) {
//       console.error('Error parsing JSON data from localStorage:', error);
//       return null;
//     }
//   } else {
//     console.log('No data found in localStorage for the given key.');
//     return null;
//   }
// };

// const formData = getDataFromLocalStorage();


  useEffect(() => {
    const filteredModules = course_id ? modules?.filter((module) => module.course_id === course_id) : [];
    setModuleList(filteredModules);
  }, [course_id]);

  const handleClose = () => {
    setShow(false);
    setModalType('');
    setSelectedModuleIndex(null);
    setNewModuleName('');
  };

  const handleShow = (type, moduleIndex = null, module_id) => {
    setModuleId(module_id)
    setModalType(type);
    setSelectedModuleIndex(moduleIndex);
    setShow(true);
  };

  const handleAddModule = () => {
    if (newModuleName.trim() !== '') {
      const updatedModules = [...moduleList, { title: newModuleName, activities: [] }];
      setModuleList(updatedModules);
      setActiveKeys([...activeKeys, moduleList.length.toString()]);
      handleClose();
    }
  };

  const handleAddActivity = (activityType) => {
    if (selectedModuleIndex !== null) {
      const updatedModules = [...moduleList];
      updatedModules[selectedModuleIndex].activities.push({ title: activityType });
      setModuleList(updatedModules);
      handleClose();
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const reorderedModules = Array.from(moduleList);
    const [movedModule] = reorderedModules.splice(source.index, 1);
    reorderedModules.splice(destination.index, 0, movedModule);

    setModuleList(reorderedModules);
  };

  const toggleAccordion = (key) => {
    if (activeKeys.includes(key)) {
      setActiveKeys(activeKeys.filter((k) => k !== key));
    } else {
      setActiveKeys([...activeKeys, key]);
    }
  };

  const handleEditTitle = (index) => {
    setEditingIndex(index);
  };

  const handleTitleChange = (e, index) => {
    const updatedModules = [...moduleList];
    updatedModules[index].title = e.target.value;
    setModuleList(updatedModules);
  };

  const handleSaveTitle = () => {
    setEditingIndex(null);
  };

  // eslint-disable-next-line no-unused-vars
  const addQuiz = () => {
    window.location.href=`http://localhost:3000/app/course-content/quiz?moduleId=${moduleId}`;
  };
  return (
    <Container fluid className="p-0">
      <Row>
        <Col className="text-end">
          <Button variant="outline-primary" onClick={() => handleShow('addModule')}>
            <i className="feather icon-plus" />
            Add module
          </Button>
        </Col>
      </Row>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="moduleList">
          {(provided) => (
            <Accordion activeKey={activeKeys} className="my-4 accordian" ref={provided.innerRef} {...provided.droppableProps}>
              {moduleList?.map((module, index) => (
                <Draggable key={index} draggableId={`module-${index}`} index={index}>
                  {(provided) => (
                    <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header className="accordion-header" onClick={() => toggleAccordion(index.toString())}>
                          {editingIndex === index ? (
                            <input
                              type="text"
                              value={module.title}
                              onChange={(e) => handleTitleChange(e, index)}
                              onBlur={handleSaveTitle}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveTitle();
                              }}
                              autoFocus
                              style={{
                                width: '100%',
                                border: 'none',
                                padding: '2px'
                              }}
                            />
                          ) : (
                            <b>
                              {module.title}{' '}
                              <MdModeEdit style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => handleEditTitle(index)} />
                            </b>
                          )}
                        </Accordion.Header>
                        <Accordion.Body>
                          <ul className="activity-list">
                            {module?.activities?.map((activity, idx) => (
                              <li
                                key={idx}
                                className="mb-2"
                                style={{
                                  fontSize: '1.1rem',
                                  cursor: 'pointer',
                                  background: 'transparent',
                                  color:
                                    activity.title === 'Quiz'
                                      ? '#D92165'
                                      : activity.title === 'Assignment'
                                        ? '#9217CB'
                                        : activity.title === 'Videos'
                                          ? '#D3291C'
                                          : 'black'
                                }}
                              >
                                {activity.title === 'Quiz' && <MdOutlineQuiz />}
                                {activity.title === 'Assignment' && <IoDocumentTextOutline />}
                                {activity.title === 'Videos' && <MdOndemandVideo />}
                                <b>{activity.title}</b>
                              </li>
                            ))}
                          </ul>
                          <Button variant="outline-primary" className="mt-2" onClick={() => handleShow('addActivity', index,module.id)}>
                            Add Activity
                          </Button>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Accordion>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Module Modal */}
      {modalType === 'addModule' && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="add-module-title">Add Module</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="module_name text-black">Module name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter module name"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAddModule} className="save-button">
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Add Activity Modal */}
      {modalType === 'addActivity' && (
        <Modal
          show={show}
          onHide={handleClose}
          className="add-activity-module"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="activity-title">Add Activity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="activities">
              <Col
                xs={4}
                md={4}
                className="d-flex flex-column align-items-center justify-content-center "
                onClick={() => handleAddActivity('Quiz')}
              >
                <div onClick={() => addQuiz()}>
                  <MdOutlineQuiz className="quiz_icon" />
                  <div className="quiz">
                    <b>Quiz</b>
                  </div>
                </div>
              </Col>
              <Col
                xs={4}
                md={4}
                className="d-flex flex-column align-items-center justify-content-center"
                onClick={() => handleAddActivity('Assignment')}
              >
                <IoDocumentTextOutline className="assignment-icon" />
                <div className="assignment">
                  <b>Assignment</b>
                </div>
              </Col>
              <Col
                xs={4}
                md={4}
                className="d-flex flex-column align-items-center justify-content-center"
                onClick={() => handleAddActivity('Videos')}
              >
                <MdOndemandVideo className="video-icon" />
                <div className="video">
                  <b>Video</b>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="close-button" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default CourseContent;
