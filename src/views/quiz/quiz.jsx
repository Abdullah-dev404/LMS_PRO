import React, { useState, useEffect } from 'react';
import { Button, Card, Form, InputGroup, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import sections from '../questions/config/sections.json';
import { useLocation } from 'react-router-dom';
import { BsRecordCircleFill } from 'react-icons/bs';
import { BiCheckboxSquare } from 'react-icons/bi';
import { CiText } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import '../quiz/quiz.css';
// import { format } from 'date-fns';
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('Quiz');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const module_id = query.get('moduleId');

  //   useEffect(() => {
  //     const filteredSections = module_id ? sections?.filter((section) => section.module_id === selectedModule.id) : [];
  //     setSelectedModule(filteredSections);
  //   }, [module_id]);

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
  };

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

  // Generate JSON
  // const generateJSON = () => {
  //     const formattedQuestions = questions.map((q) => ({
  //         id: q.id,
  //         type: q.type,
  //         question: q.question,
  //         options: q.options,
  //         points: q.points,
  //         answer:
  //             q.type === 'single_choice'
  //                 ? { optionId: q.answer + 1, optionText: q.options[q.answer] }
  //                 : q.type === 'multi_choice'
  //                 ? q.answer.map((i) => ({ optionId: i + 1, optionText: q.options[i] }))
  //                 : q.answer
  //     }));
  //     console.log(formattedQuestions);
  // };

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
      title: title,
      start_time: startDate,
      end_time: endDate,
      type: 'quiz',
      id: `quiz-${Date.now()}`,
      module_id: module_id,
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
      className="container"
      style={{
        maxWidth: '1000px',
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
      <div style={{ display: 'flex', justifyContent: 'left', alignContent: 'center', flex: 'row', marginTop: '20px' }}>
        <Button
          className="single-choice"
          variant="outline-primary"
          onClick={() => addQuestion('single_choice')}
          style={{ backgroundColor: '#F3F3FF', color: '##514AC9' }}
        >
          <BsRecordCircleFill style={{ marginRight: '4px', marginTop: '-3' }} />
          <b>Add Single Choice</b>
        </Button>
        <Button
          className="multi-choice"
          variant="outline-primary "
          onClick={() => addQuestion('multi_choice')}
          style={{ backgroundColor: '#F3F3FF', color: '##514AC9' }}
        >
          <BiCheckboxSquare style={{ marginRight: '4px', fontSize: '20px', marginTop: '-3' }} />
          <b>Add Multi Choice </b>
        </Button>
        <Button
          variant="outline-primary "
          className="text-choice"
          onClick={() => addQuestion('text')}
          style={{ backgroundColor: '#F3F3FF', color: '##514AC9' }}
        >
          <CiText style={{ marginRight: '4px', fontSize: '20px', marginTop: '-3' }} />
          <b>Add Text</b>
        </Button>
      </div>

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

            <div>
              {/* Single: {counts.single_choice}, Multi: {counts.multi_choice}, Text: {counts.text}, Total: {counts.total}, Points:{' '}
              {getTotalPoints()} */}
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group className="p-2" md="6" controlId="formBasicStartDate">
                  <Form.Label as="h6">Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="startDate"
                    placeholder="Enter Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                      border: 'none',
                      borderBottom: '2px solid #0000FF',
                      outline: 'none',
                      borderRadius: '0'
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="p-2" md="6" controlId="formBasicEndDate">
                  <Form.Label as="h6">End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="endDate"
                    placeholder="Enter End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{
                      border: 'none',
                      borderBottom: '2px solid #0000FF',
                      outline: 'none',
                      borderRadius: '0'
                    }}
                  />
                  {/* <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /> */}
                </Form.Group>
              </Col>
            </Row>
            {questions.map((question, index) => (
              <div key={question.id} className="mb-3 p-2 rounded">
                <Form.Group controlId={`question-${index}`}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    {/* <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}> */}
                    <Form.Label as="h5" style={{ fontWeight: 'bold' }}>
                      Question #{index + 1}
                    </Form.Label>

                    {/* </div> */}

                    {/* ----------------------Points---------------- */}

                    <div 
                     style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
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
                          placeholder="Enter points for this question"
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
                    style={{ color: '#0000FF', background: 'transparent', border: 'none', outline: 'none' }}
                  >
                    <IoMdAdd style={{ fontSize: '20px' }} className="mr-3" />
                    <b className="ml-3">Add Option</b>
                  </Button>
                </div>
              </div>
            ))}
          </Card.Body>
          <Card.Footer
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              onClick={() => {
                generateJSON(questions, startDate, endDate, title);
              }}
              className=" px-5 "
              style={{
                display: 'flex',
                gap: '2px',
                alignContent: 'center',
                fontWeight: 'bold',
                backgroundColor: '#0000FF'
              }}
              size="md"
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
