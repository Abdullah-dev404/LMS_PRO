import React, { useState } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('Quiz');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
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
                            <div
                                key={i}
                                className="mb-2 p-2"
                                style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}
                            >
                                <InputGroup>
                                    <InputGroup.Radio
                                        name={`question-${question.id}`}
                                        onChange={() => updateQuestion(question.id, 'answer', i)}
                                    />
                                    <Form.Control type="text" value={opt} onChange={(e) => updateOption(question.id, i, e.target.value)} />
                                </InputGroup>
                                {question.options.length > 2 && (
                                    <Button variant="danger" className="" onClick={() => deleteOption(question.id, i)}>
                                        <i className="feather icon-trash-2 d-flex justify-content-center align-content-center mx-auto" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                );
            case 'multi_choice':
                return (
                    <div>
                        {question.options.map((opt, i) => (
                            <div
                                key={i}
                                className="mb-2 p-2"
                                style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}
                            >
                                <InputGroup>
                                    <InputGroup.Checkbox
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            const newAnswer = isChecked
                                                ? [...question.answer, i]
                                                : question.answer.filter((ans) => ans !== i);
                                            updateQuestion(question.id, 'answer', newAnswer);
                                        }}
                                    />
                                    <Form.Control type="text" value={opt} onChange={(e) => updateOption(question.id, i, e.target.value)} />
                                </InputGroup>
                                {question.options.length > 2 && (
                                    <Button variant="danger" onClick={() => deleteOption(question.id, i)}>
                                        {' '}
                                        <i className="feather icon-trash-2 d-flex justify-content-center align-content-center mx-auto" />
                                    </Button>
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
    const generateJSON = () => {
        const formattedQuestions = questions.map((q) => ({
            id: q.id,
            type: q.type,
            question: q.question,
            options: q.options,
            points: q.points,
            answer:
                q.type === 'single_choice'
                    ? { optionId: q.answer + 1, optionText: q.options[q.answer] }
                    : q.type === 'multi_choice'
                    ? q.answer.map((i) => ({ optionId: i + 1, optionText: q.options[i] }))
                    : q.answer
        }));
        console.log(formattedQuestions);
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
        <div className="container" style={{ maxWidth: '1000px' }}>
            <h3>Quiz Builder</h3>
            <div style={{ display: 'flex', justifyContent: 'end', alignContent: 'center', flex: 'row' }}>
                <Button variant="outline-primary " onClick={() => addQuestion('single_choice')}>
                    Add Single Choice
                </Button>
                <Button variant="outline-primary " onClick={() => addQuestion('multi_choice')}>
                    Add Multi Choice
                </Button>
                <Button variant="outline-primary " onClick={() => addQuestion('text')}>
                    Add Text
                </Button>
            </div>

            {questions?.length > 0 ? (
                <Card>
                    <Card.Header className="d-flex flex-row justify-content-between align-items-center">
                        {isEditingTitle ? (
                            <Form.Control
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={() => setIsEditingTitle(false)}
                                autoFocus
                            />
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'start' }}>
                                <Card.Title as="h5">{title}</Card.Title>
                                <i
                                    className="feather icon-edit-2 d-flex justify-content-start align-content-center m-auto"
                                    onClick={() => setIsEditingTitle(true)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        )}

                        <div>
                            Single: {counts.single_choice}, Multi: {counts.multi_choice}, Text: {counts.text}, Total: {counts.total},
                            Points: {getTotalPoints()}
                        </div>
                    </Card.Header>
                    {questions.map((question, index) => (
                        <Card.Body>
                            <div
                                key={question.id}
                                className="mb-3 p-2 rounded"
                                style={{
                                    // border: '1px solid black',
                                    boxShadow:
                                        'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset'
                                }}
                            >
                                <Form.Group controlId={`question-${index}`}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 'row' }}>
                                        <Form.Label as="h6" style={{ fontWeight: 'bold' }}>
                                            Question #{index + 1}
                                        </Form.Label>
                                        <Button variant="danger" onClick={() => deleteQuestion(question.id)} className="px-2 py-1">
                                            <i className="feather icon-trash-2 d-flex justify-content-center align-content-center m-auto" />
                                        </Button>
                                    </div>
                                    <Form.Control
                                        type="text"
                                        value={question.question}
                                        onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                                        placeholder="Enter your question"
                                    />
                                </Form.Group>
                                {renderQuestion(question)}
                                <div style={{ display: 'flex', justifyContent: 'end', alignContent: 'center', flex: 'row' }}>
                                    <Button
                                        variant="primary"
                                        onClick={() => addOption(question.id)}
                                        className={question.type !== 'text' ? 'd-flex' : 'd-none'}
                                    >
                                        Add Option
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    ))}
                    <Card.Footer>
                        <Button
                            onClick={generateJSON}
                            className="m-auto px-5 "
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '2px',
                                alignContent: 'center',
                                fontWeight: 'bold'
                            }}
                            size="md"
                        >
                            Submit
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
