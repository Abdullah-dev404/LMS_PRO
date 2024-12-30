import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import './ModuleSection.css';
import { MdOutlineQuiz, MdOutlineAssignment, MdVideoLibrary, MdOutlineDescription, MdEdit  } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const TopicAccordion = () => {
  const [topics, setTopics] = useState([
    {
      name: 'Topic 1',
      tasks: ['Quiz', 'Video', 'Assignment']
    },
    {
      name: 'Topic 2',
      tasks: ['Quiz', 'Video', 'Assignment', 'Assignment']
    },
    {
      name: 'Topic 3',
      tasks: ['Quiz', 'Video', 'Assignment']
    }
  ]);

  const [editingIndex, setEditingIndex] = useState(null);

  const taskMapping = {
    Quiz: { icon: <MdOutlineQuiz />, color: 'gray' },
    Assignment: { icon: <MdOutlineAssignment />, color: 'gray' },
    Video: { icon: <MdVideoLibrary />, color: 'gray' },
    Description: { icon: <MdOutlineDescription />, color: 'gray' }
  };

  const handleNameChange = (index, newName) => {
    const updatedTopics = [...topics];
    updatedTopics[index].name = newName;
    setTopics(updatedTopics);
  };

  return (
    <div className="container mt-5">
      <Accordion>
        {topics.map((topic, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={topic.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    onBlur={() => setEditingIndex(null)}
                    autoFocus
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '4px',
                      flex: 1
                    }}
                  />
                ) : (
                  <b style={{fontWeight:"bolder" }}>{topic.name}</b>
                )}
                <MdEdit 
                  onClick={() => setEditingIndex(index)}
                  style={{
                    cursor: 'pointer',
                    marginLeft: '8px',
                    color: '#555'
                  }}
                />
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="timeline">
                {topic.tasks.map((task, taskIndex) => {
                  const taskDetails = taskMapping[task]; 
                  return (
                    <div key={taskIndex} className="timeline-task">
                      <div className="dot-line">
                        <div
                          className="dot"
                          style={{ backgroundColor: taskDetails?.color }}
                        ></div>
                        {taskIndex !== topic.tasks.length - 1 && (
                          <div className="line"></div>
                        )}
                      </div>
                      <div
                        className="task-text"
                        style={{ color: taskDetails?.color }}
                      >
                        {taskDetails?.icon} {task}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default TopicAccordion;
