import React, { useState } from 'react';
import courses from './config/courses.json';
import modules from './config/modules.json';
import sections from './config/sections.json';
import quizzes from './config/quizzes.json';

const CourseExplorer = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);

    // Filtered data based on selections
    const filteredModules = selectedCourse ? modules.filter((module) => module.course_id === selectedCourse.id) : [];
    const filteredSections = selectedModule ? sections.filter((section) => section.module_id === selectedModule.id) : [];
    const filteredQuizzes = selectedSection ? quizzes.filter((quiz) => quiz.section_id === selectedSection.id) : [];

    return (
        <div>
            {/* Courses List */}
            <h2>Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li
                        key={course.id}
                        onClick={() => {
                            setSelectedCourse(course);
                            setSelectedModule(null);
                            setSelectedSection(null);
                        }}
                        style={{
                            cursor: 'pointer',
                            fontWeight: selectedCourse?.id === course.id ? 'bold' : 'normal'
                        }}
                    >
                        {course.title}
                    </li>
                ))}
            </ul>

            {/* Modules List */}
            {selectedCourse && (
                <>
                    <h2>Modules for {selectedCourse.title}</h2>
                    <ul>
                        {filteredModules.map((module) => (
                            <li
                                key={module.id}
                                onClick={() => {
                                    setSelectedModule(module);
                                    setSelectedSection(null);
                                }}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: selectedModule?.id === module.id ? 'bold' : 'normal'
                                }}
                            >
                                {module.title}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Sections List */}
            {selectedModule && (
                <>
                    <h2>Sections for {selectedModule.title}</h2>
                    <ul>
                        {filteredSections.map((section) => (
                            <li
                                key={section.id}
                                onClick={() => setSelectedSection(section)}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: selectedSection?.id === section.id ? 'bold' : 'normal'
                                }}
                            >
                                {section.title}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Quizzes/Assignments List */}
            {selectedSection && (
                <>
                    <h2>Items in {selectedSection.title}</h2>
                    <ul>
                        {filteredQuizzes.map((quiz) => (
                            <li key={quiz.id}>
                                {quiz.title} ({quiz.type}){quiz.start_time && ` | Start: ${quiz.start_time}`}
                                {quiz.end_time && ` | End: ${quiz.end_time}`}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default CourseExplorer;
