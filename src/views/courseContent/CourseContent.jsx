import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MdModeEdit } from 'react-icons/md';
import { MdOutlineTopic, MdQuiz } from 'react-icons/md';
import { BiSolidBookContent } from 'react-icons/bi';
import './CourseContent.css';
import { useLocation } from 'react-router-dom';
import modules from '../../config/module.json';
import { v4 as uuidv4 } from 'uuid';

const CourseContent = () => {
  const [moduleList, setModuleList] = useState([]);
  const [activeKeys, setActiveKeys] = useState([]);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);
  const [newModuleName, setNewModuleName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [moduleId, setModuleId] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [sectionList, setSectionList] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState('');

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const course_id = query.get('courseId');

  useEffect(() => {
    const filteredModules = course_id ? modules.filter((module) => module.course_id === course_id) : [];
    setModuleList(filteredModules);
    setActiveKeys(filteredModules.map((_, index) => index.toString()));
  }, [course_id]);

  const handleClose = () => {
    setShow(false);
    setModalType('');
    setSelectedModuleIndex(null);
    setNewModuleName('');
    setSectionName('');
  };

  const handleShow = (type, moduleIndex = null, module_id) => {
    setModalType(type);
    setSelectedModuleIndex(moduleIndex);
    setModuleId(module_id);
    setShow(true);
  };
  const handleShowSection = (type, moduleIndex = null, section_id) => {
    setModalType(type);
    setSelectedModuleIndex(moduleIndex);
    setSelectedSectionId(section_id);
    setShow(true);
  };
  const handleAddModule = () => {
    if (newModuleName.trim() !== '') {
      const newModule = {
        id: uuidv4(),
        course_id: course_id,
        title: newModuleName,
        type: 'module'
      };
      const updatedModules = [...moduleList, newModule];
      setModuleList(updatedModules);
      setActiveKeys((prevKeys) => [...prevKeys, (updatedModules.length - 1).toString()]);
      handleClose();
    }
  };

  const handleAddSection = () => {
    if (sectionName.trim() !== '') {
      const newSection = {
        sectionId: uuidv4(),
        moduleId: moduleId,
        section_name: sectionName,
        type: 'section'
      };
      const updatedSections = [...sectionList, newSection];
      setSectionList(updatedSections);
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

  return (
    <Container fluid className="p-0">
      <Row>
        <Col className="text-end">
          <Button variant="outline-primary" onClick={() => handleShow('addModule')}>
            <i className="feather icon-plus" />
            Add Module
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
                          {sectionList.map((section, sectionIndex) => (
                            <ul className="activity-list" key={sectionIndex}>
                              <li className="mt-3">
                                <MdOutlineTopic
                                  style={{ cursor: 'pointer', marginTop: '-3px' }}
                                  onClick={() => handleShowSection('sectionType', index, section.sectionId)}
                                />
                                <b
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleShowSection('sectionType', index, section.sectionId)}
                                >
                                  {section?.section_name}
                                </b>
                              </li>
                            </ul>
                          ))}
                          <Button variant="outline-primary" onClick={() => handleShow('addSection', index, module.id)}>
                            Add Section
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
              <Form.Group className="mb-3" controlId="moduleName">
                <Form.Label className="module_name text-black">Module Name</Form.Label>
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

      {/* Add Section Modal */}
      {modalType === 'addSection' && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Section</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="sectionName">
                <Form.Label>Section Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter section name"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAddSection}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* -----------------------------------Select TYpes-------------------------- */}

      {modalType === 'sectionType' && (
        <Modal show={show} onHide={handleClose} style={{border:'10px solid black'}} >
          <Modal.Header closeButton>
            <Modal.Title style={{fontWeight:'bolder', fontSize:'20px'}} >Select Section Type</Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example"style={{height:"20vh"}} >
            <Container>
              <Row>
                <Col xs={12} md={4} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                  <MdQuiz
                    onClick={() => {
                      window.open(`http://localhost:3000/app/course-content/section/quiz?sectionId=${selectedSectionId}`, '_blank');
                    }}
                    style={{
                      color: '#FF5757',
                      fontSize: '20px',
                      cursor: 'pointer'
                    }}
                  />
                  <div
                    onClick={() => {
                      window.open(`http://localhost:3000/app/course-content/section/quiz?sectionId=${selectedSectionId}`, '_blank');
                    }}
                    style={{
                      color: '#FF5757',
                      fontSize: '20px',
                      fontWeight: 'bolder',
                      cursor: 'pointer'
                    }}
                  >
                    Quiz
                  </div>
                </Col>

                <Col xs={12} md={4} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                  <BiSolidBookContent
                    onClick={() => {
                      window.open(`http://localhost:3000/app/curseContent/section/selectTemplate?sectionId=${selectedSectionId}`, '_blank');
                    }}
                    style={{
                      color: 'gray',
                      fontSize: '20px',
                      cursor: 'pointer'
                    }}
                  />
                  <div
                    onClick={() => {
                      window.open(`http://localhost:3000/app/curseContent/section/selectTemplate?sectionId=${selectedSectionId}`, '_blank');
                    }}
                    style={{
                      color: 'gray',
                      fontSize: '20px',
                      fontWeight: 'bolder',
                      cursor: 'pointer'
                    }}
                  >
                    Content
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default CourseContent;
