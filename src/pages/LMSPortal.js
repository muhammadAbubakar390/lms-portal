import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const LMSPortal = () => {
    const navigate = useNavigate();
    const [registeredCourses, setRegisteredCourses] = useState([]);

    useEffect(() => {
        // Mock data for frontend-only deployment
        const mockCourses = [
            {
                course_code: 'CS101',
                course_name: 'Introduction to Programming',
                teacher_name: 'Dr. John Smith'
            },
            {
                course_code: 'MATH202',
                course_name: 'Calculus II',
                teacher_name: 'Prof. Alice Johnson'
            },
            {
                course_code: 'ENG105',
                course_name: 'Communication Skills',
                teacher_name: 'Ms. Sarah Parker'
            }
        ];
        
        setRegisteredCourses(mockCourses);
    }, []);

    return (
        <div className="container" style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div className="main-content" style={{ flex: 1, padding: '30px', backgroundColor: '#f5f8fa' }}>
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '20px 25px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)' }}>
                    <h1>Learning Management System</h1>
                    <div className="date-display">
                        <i className="fas fa-calendar-alt"></i>
                        <span> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>

                <div className="stats-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                    <div className="stat-card" style={{ background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center' }}>
                        <div className="stat-icon" style={{ width: '50px', height: '50px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', fontSize: '20px', background: '#e8f4fc', color: '#3498db' }}>
                            <i className="fas fa-book"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Enrolled Courses</h3>
                            <p>{registeredCourses.length}</p>
                        </div>
                    </div>

                    <div className="stat-card" style={{ background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center' }}>
                        <div className="stat-icon" style={{ width: '50px', height: '50px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', fontSize: '20px', background: '#fff3cd', color: '#ffc107' }}>
                            <i className="fas fa-tasks"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Pending Assignments</h3>
                            <p>3</p>
                        </div>
                    </div>
                </div>

                <div className="courses-container" style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', marginBottom: '30px' }}>
                    <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2>My Courses</h2>
                        <a href="#" className="view-all" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 500 }}>View All</a>
                    </div>

                    <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {registeredCourses.length > 0 ? registeredCourses.map((course, index) => (
                            <div key={index} className="course-card" style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                                <div className="course-header" style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                                    <h3 style={{ margin: '0 0 5px 0' }}>{course.course_name}</h3>
                                    <p style={{ margin: 0, color: '#7f8c8d' }}>{course.teacher_name}</p>
                                </div>
                                <div className="course-progress" style={{ padding: '15px', background: '#f8f9fa' }}>
                                    <div className="progress-bar" style={{ height: '8px', background: '#e9ecef', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                                        <div className="progress-fill" style={{ width: '0%', height: '100%', background: '#3498db', borderRadius: '4px' }}></div>
                                    </div>
                                    <div className="progress-text" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#7f8c8d' }}>
                                        <span>Progress</span>
                                        <span>0%</span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p style={{ color: '#7f8c8d', padding: '20px' }}>No courses registered yet.</p>
                        )}
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button onClick={() => navigate(-1)} className="btn back-btn" style={{ background: '#95a5a6', border: 'none', padding: '10px 20px', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Back to Dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default LMSPortal;
