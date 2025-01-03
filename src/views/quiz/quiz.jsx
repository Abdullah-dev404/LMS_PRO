import React, { useState } from 'react';
import { Button, Card, Form, InputGroup, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import { BsRecordCircleFill } from 'react-icons/bs';
import { BiCheckboxSquare } from 'react-icons/bi';
import { CiText } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { IoMdAddCircle } from 'react-icons/io';
import '../quiz/quiz.css';
import { v4 as uuidv4 } from 'uuid';
// import { format } from 'date-fns';
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('Quiz');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showQuestionButtons, setShowQuestionButton] = useState(false);
  const [oneTimeAppears, setOneTimeAppears] = useState(true);

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const section_id = query.get('sectionId');

  const toggleShowQuestionButton = () => {
    setShowQuestionButton(!showQuestionButtons);
  };
  // Add a new question with default settings
  const addQuestion = (type) => {
    const defaultQuestionText = {
      single_choice: 'This is a single-choice question',
      multi_choice: 'This is a multi-choice question',
      text: 'This is a text question'
    };

    setQuestions([
      ...questions,
      {
        id: Date.now(),
        type,
        question: defaultQuestionText[type],
        options: type !== 'text' ? ['Option 1', 'Option 2'] : [],
        answer: type === 'text' ? '' : type === 'single_choice' ? -1 : [],
        points: 1
      }
    ]);
    setShowQuestionButton(!showQuestionButtons);
    setOneTimeAppears(false);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const updatedQuestions = Array.from(questions);
    const [reorderedItem] = updatedQuestions.splice(result.source.index, 1);
    updatedQuestions.splice(result.destination.index, 0, reorderedItem);

    setQuestions(updatedQuestions); // Assuming `setQuestions` is your state updater for questions
  }

  // Update a question field
  const updateQuestion = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              [field]: value
            }
          : q
      )
    );
  };

  // Update options for single/multi-choice questions
  const updateOption = (id, index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === index ? value : opt))
            }
          : q
      )
    );
  };

  // Add an option
  const addOption = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              options: [...q.options, `Option ${q.options.length + 1}`]
            }
          : q
      )
    );
  };

  // Delete an option
  const deleteOption = (id, index) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.filter((_, i) => i !== index)
            }
          : q
      )
    );
  };

  // Delete a question
  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Render the quiz form
  const renderQuestion = (question) => {
    switch (question.type) {
      case 'single_choice':
        return (
          <div>
            {question.options.map((opt, i) => (
              <div key={i} className="mb-2 p-2" style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                <InputGroup>
                  <InputGroup.Radio
                    name={`question-${question.id}`}
                    onChange={() => updateQuestion(question.id, 'answer', i)}
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #0D6EFD',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <Form.Control
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(question.id, i, e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'white' }}
                  />
                </InputGroup>
                {question.options.length > 2 && (
                  <div
                    className=""
                    onClick={() => deleteOption(question.id, i)}
                    style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                  >
                    <i
                      className="feather icon-trash-2 d-flex justify-content-center align-content-center mx-auto"
                      style={{ color: 'red', cursor: 'pointer', fontSize: '18px' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'multi_choice':
        return (
          <div>
            {question.options.map((opt, i) => (
              <div key={i} className="mb-2 p-2" style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                <InputGroup>
                  <InputGroup.Checkbox
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const newAnswer = isChecked ? [...question.answer, i] : question.answer.filter((ans) => ans !== i);
                      updateQuestion(question.id, 'answer', newAnswer);
                    }}
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #0D6EFD',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <Form.Control
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(question.id, i, e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'white' }}
                  />
                </InputGroup>
                {question.options.length > 2 && (
                  <div
                    onClick={() => deleteOption(question.id, i)}
                    style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                  >
                    {' '}
                    <i
                      className="feather icon-trash-2 d-flex justify-content-center align-content-center mx-auto"
                      style={{ color: 'red', cursor: 'pointer', fontSize: '18px' }}
                    />
                  </div>
                )}
              </div>
            ))}
            {/* <Button onClick={() => addOption(question.id)}>Add Option</Button> */}
          </div>
        );
      case 'text':
        return (
          <div>
            <Form.Group className="p-2">
              <Form.Label as="h6">Answer</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={question.answer}
                onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
                placeholder="Enter your answer"
              />
            </Form.Group>
            {/* <input
                            type="text"
                            value={question.answer}
                            onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
                            placeholder="Enter your answer"
                        /> */}
          </div>
        );
      default:
        return null;
    }
  };

  const generateJSON = (questions, startDate, endDate, title) => {
    if (!Array.isArray(questions)) {
      console.error('Invalid input: questions must be an array.');
      return;
    }

    // Format the questions structure
    const formattedQuestions = questions.map((q) => ({
      id: q.id,
      type: q.type,
      question: q.question,
      options: q.options,
      answer:
        q.type === 'single_choice'
          ? { index: q.answer, value: q.options[q.answer] }
          : q.type === 'multi_choice'
            ? q.answer.map((i) => ({ index: i, value: q.options[i] }))
            : q.answer
    }));

    console.log('Formated Questions', formattedQuestions);

    for (const question of formattedQuestions) {
      if (question.type === 'text' && (!question.answer || question.answer.trim() === '')) {
        toast.error(`Text question "${question.question}" has an empty answer.`);
        return;
      }
      if (question.type === 'single_choice' && (question.answer?.index === undefined || question.answer?.value === undefined)) {
        toast.error(`Single choice question "${question.question}" has no correct option selected.`);
        return;
      }
      if (question.type === 'multi_choice' && (!Array.isArray(question.answer) || question.answer.length === 0)) {
        toast.error(`Multi-choice question "${question.question}" has no options selected.`);
        return;
      }
    }

    const quizData = {
      id: uuidv4(),
      sectionId: section_id,
      title: title,
      startDate:startDate,
      endDate:endDate,
      type: 'quiz',
      quiz: formattedQuestions
    };

    const storedQuizzes = JSON.parse(localStorage.getItem('quiz')) || [];
    storedQuizzes.push(quizData);
    localStorage.setItem('quiz', JSON.stringify(storedQuizzes));
    toast.success('Quiz successfully saved to localStorage!');
  };

  // Count questions by type and total
  const getCounts = () => {
    const counts = {
      single_choice: 0,
      multi_choice: 0,
      text: 0,
      total: 0
    };
    questions.forEach((q) => {
      counts[q.type]++;
    });
    counts.total = questions.length;
    return counts;
  };

  const counts = getCounts();
  const getTotalPoints = () => {
    return questions.reduce((total, question) => total + (question.points || 0), 0);
  };

  return (
    <div
      className="container quizBuilderModule"
      style={{
        backgroundColor: '#FFFFFF',
        height: 'auto',
        padding: '35px',
        borderRadius: '20px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
      }}
    >
      <h3 style={{ fontWeight: 'bolder' }} className="quiz-builder">
        Quiz Builder
      </h3>
      {oneTimeAppears && (
        <div>
          <Button
            style={{ color: '#0000FF', background: 'transparent', border: 'none', outline: 'none' }}
            onClick={toggleShowQuestionButton}
          >
            <IoMdAddCircle style={{ fontSize: '20px' }} className="me-1" />
            <b className="ml-3">Add Question</b>
          </Button>
          {showQuestionButtons && (
            <div style={{ display: 'flex', justifyContent: 'left', alignContent: 'center', flex: 'row', marginTop: '20px' }}>
              <Button className="single-choice" variant="outline-primary" onClick={() => addQuestion('single_choice')}>
                <BsRecordCircleFill style={{ marginRight: '4px', marginTop: '-3' }} />
                <b>Add Single Choice</b>
              </Button>
              <Button className="multi-choice" variant="outline-primary " onClick={() => addQuestion('multi_choice')}>
                <BiCheckboxSquare style={{ marginRight: '4px', fontSize: '20px', marginTop: '-3' }} />
                <b>Add Multi Choice </b>
              </Button>
              <Button variant="outline-primary " className="text-choice" onClick={() => addQuestion('text')}>
                <CiText style={{ marginRight: '4px', fontSize: '20px', marginTop: '-3' }} />
                <b>Add Text</b>
              </Button>
            </div>
          )}
        </div>
      )}

      {questions?.length > 0 ? (
        <Card
          style={{
            borderTop: '5px solid blue'
          }}
          className="mt-2 rounded"
        >
          <Card.Header className="d-flex flex-row justify-content-between align-items-center">
            {isEditingTitle ? (
              <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => setIsEditingTitle(false)} autoFocus />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'start' }}>
                <Card.Title as="h5">
                  <b>{title}</b>{' '}
                </Card.Title>
                <i
                  className="feather icon-edit-2 d-flex justify-content-start align-content-center m-auto"
                  onClick={() => setIsEditingTitle(true)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
          </Card.Header>
          <Card.Body>
            <div style={{ marginTop: '15px', width: '100%', display: 'flex', gap: '20px', alignItems: 'center' }}>
             
              <Form.Group controlId="startDate" style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
                <Form.Label style={{ fontWeight: 'bold', marginRight: '10px', whiteSpace: 'nowrap',color:'black' }}>Start Date:</Form.Label>
                <Form.Control 
                  type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} 
                style={{
                  border: 'none',
                  borderBottom: '2px solid #0000FF',
                  outline: 'none',
                  borderRadius: '0'
                }}
                />
              </Form.Group>

              <Form.Group controlId="endDate" style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
                <Form.Label style={{ fontWeight: 'bold', marginRight: '10px', whiteSpace: 'nowrap',color:'black'  }}>End Date:</Form.Label>
                <Form.Control type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                 style={{
                  border: 'none',
                  borderBottom: '2px solid #0000FF',
                  outline: 'none',
                  borderRadius: '0'
                }}
                />
              </Form.Group>
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {questions.map((question, index) => (
                      <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-3 p-2 rounded"
                            style={{
                              ...provided.draggableProps.style,
                              background: 'white',
                              borderRadius: '8px'
                            }}
                          >
                            <Form.Group controlId={`question-${index}`}>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  gap: '10px'
                                }}
                              >
                                <Form.Label as="h5" style={{ fontWeight: 'bold' }}>
                                  # {index + 1}
                                </Form.Label>

                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                  }}
                                >
                                  <Form.Group
                                    className="ml-auto"
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'end',
                                      alignItems: 'baseline',
                                      flex: 'row',
                                      gap: '5px'
                                    }}
                                  >
                                    <Form.Label as="h5">Points</Form.Label>
                                    <Form.Control
                                      type="text"
                                      min={0}
                                      value={question.points}
                                      onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value, 10) || 0)}
                                      style={{ padding: '3px 2px', width: '30px' }}
                                    />
                                  </Form.Group>

                                  <MdDelete
                                    className="feather icon-trash-2 mb-2"
                                    style={{ cursor: 'pointer', fontSize: '22px', color: 'gray', justifyContent: 'end' }}
                                    onClick={() => deleteQuestion(question.id)}
                                  />
                                </div>
                              </div>
                              <Form.Control
                                type="text"
                                value={question.question}
                                onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                                placeholder="Enter your question"
                                style={{
                                  border: 'none',
                                  borderBottom: '2px solid #0000FF',
                                  outline: 'none',
                                  borderRadius: '0'
                                }}
                              />
                            </Form.Group>
                            {renderQuestion(question)}
                            <div style={{ display: 'flex', alignContent: 'center', flex: 'row' }}>
                              <Button
                                onClick={() => addOption(question.id)}
                                className={question.type !== 'text' ? 'd-flex' : 'd-none'}
                                style={{
                                  color: '#0000FF',
                                  background: 'transparent',
                                  border: 'none',
                                  outline: 'none'
                                }}
                              >
                                <IoMdAdd style={{ fontSize: '20px' }} className="mr-3" />
                                <b className="ml-3">Add Option</b>
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div>
              <Button
                style={{
                  color: '#0000FF',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
                onClick={toggleShowQuestionButton}
              >
                <IoMdAddCircle style={{ fontSize: '20px' }} className="me-1" />
                <b>Add Question</b>
              </Button>

              {showQuestionButtons && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '10px',
                    marginTop: '10px'
                  }}
                >
                  <Button
                    className="single-choice"
                    variant="outline-primary"
                    onClick={() => addQuestion('single_choice')}
                    // style={{ backgroundColor: '#F3F3FF', color: '##514AC9' }}
                  >
                    <BsRecordCircleFill style={{ marginRight: '4px', marginTop: '-3' }} />
                    <b>Add Single Choice</b>
                  </Button>
                  <Button
                    className="multi-choice"
                    variant="outline-primary"
                    onClick={() => addQuestion('multi_choice')}
                    style={{ backgroundColor: '#F3F3FF', color: '##514AC9' }}
                  >
                    <BiCheckboxSquare style={{ marginRight: '4px', fontSize: '20px', marginTop: '-3' }} />
                    <b>Add Multi Choice</b>
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="text-choice"
                    onClick={() => addQuestion('text')}
                    style={{ backgroundColor: '#F3F3FF', color: '##514AC9' }}
                  >
                    <CiText style={{ marginRight: '4px', fontSize: '20px', marginTop: '-3' }} />
                    <b>Add Text</b>
                  </Button>
                </div>
              )}
            </div>
          </Card.Body>
          <Card.Footer
          // style={{
          //   display: 'flex',
          //   justifyContent: 'flex-end'
          // }}
          >
            <Button
              onClick={() => {
                generateJSON(questions, startDate, endDate, title);
              }}
              className=" px-5 "
              style={{
                display: 'flex',
                alignContent: 'center',
                fontWeight: 'bold',
                backgroundColor: '#0000FF'
              }}
            >
              Save
            </Button>
          </Card.Footer>
        </Card>
      ) : (
        ''
      )}
    </div>
  );
};

export default Quiz;
