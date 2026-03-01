import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});
    const [registeredCourses, setRegisteredCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                if (!currentUser || !currentUser.token) return;
                const res = await fetch('/api/courses/mycourses', {
                    headers: { 'x-auth-token': currentUser.token }
                });
                const data = await res.json();
                if (res.ok) {
                    setRegisteredCourses(data);
                }
            } catch (e) { console.error(e); }
        };
        fetchCourses();
    }, [currentUser]);



    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="main-content" style={{ marginLeft: '280px', flex: 1, padding: '30px' }}>
                <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #3498db, #2c3e50)', color: 'white', padding: '20px 25px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <h1>University Portal Dashboard</h1>
                    <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>Welcome, {currentUser.username} ({currentUser.userType})</span>
                        <button className="logout-btn" onClick={logout} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </div>

                <div className="dashboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                    <div className="card" onClick={() => navigate('/registration')}>
                        <h2><i className="fas fa-clipboard-list"></i> New Registration</h2>
                        <ul>
                            <li>Register New Courses</li>
                        </ul>
                    </div>

                    <div className="card" onClick={() => navigate('/courses')}>
                        <h2><i className="fas fa-book"></i> My Courses</h2>
                        <div id="myCoursesList">
                            {registeredCourses.length > 0 ? (
                                <ul>
                                    {registeredCourses.map(course => (
                                        <li key={course.course_code}>{course.course_code}: {course.course_name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ padding: '10px', color: '#95a5a6', textAlign: 'center' }}>No courses registered yet</p>
                            )}
                        </div>
                    </div>

                    <div className="card">
                        <h2><i className="fas fa-chart-bar"></i> Result</h2>
                        <ul>
                            <li>Transcript Requests / Result</li>
                        </ul>
                    </div>

                    <div className="card">
                        <h2><i className="fas fa-envelope"></i> Request</h2>
                        <ul>
                            <li>Your Requests (Pending-Approved / New)</li>
                        </ul>
                    </div>

                    <div className="card" onClick={() => navigate('/lms')}>
                        <h2><i className="fas fa-graduation-cap"></i> LMS</h2>
                        <ul>
                            <li>Learning Management System</li>
                        </ul>
                    </div>

                    <div className="card" onClick={() => navigate('/roadmap')}>
                        <h2><i className="fas fa-map-marked-alt"></i> Road Map</h2>
                        <ul>
                            <li>Academic Calendar</li>
                        </ul>
                    </div>

                    <div className="card" onClick={() => navigate('/e-appointment')}>
                        <h2><i className="fas fa-calendar-check"></i> E-Appointment</h2>
                        <ul>
                            <li>Set Your Appointment</li>
                        </ul>
                    </div>

                    <div className="card" onClick={() => navigate('/short-attendance')}>
                        <h2><i className="fas fa-user-clock"></i> Short Attendance Courses</h2>
                        <ul>
                            <li>Short Attendance</li>
                        </ul>
                    </div>

                    <div className="card" onClick={() => navigate('/advisor')}>
                        <h2><i className="fas fa-user-graduate"></i> Student Advisor</h2>
                        <ul>
                            <li>Meet With your advisor</li>
                        </ul>
                    </div>
                </div>

                <div className="schedule-container" style={{ gridColumn: '1 / -1', marginTop: '20px', background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)' }}>
                    <h3 className="schedule-header" style={{ fontSize: '1.4em', margin: '0 0 15px 0', color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>Registered Courses Schedule</h3>
                    <table className="course-schedule" style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                        <thead>
                            <tr style={{ background: '#2c3e50', color: 'white' }}>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Day</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Course Code</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Course Name</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Faculty</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Type</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Mode</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Time</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registeredCourses.length > 0 ? registeredCourses.map((course, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>{course.class_day}</td>
                                    <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>{course.course_code}</td>
                                    <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>{course.course_name}</td>
                                    <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>{course.teacher_name}</td>
                                    <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>Theory</td>
                                    <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>On-Campus</td>
                                    <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>{course.class_time}</td>
                                    <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>{course.room}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="8" style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>No courses registered yet. Please go to Registration.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#2c3e50', color: 'white', borderRadius: '8px', marginTop: '30px', fontSize: '14px' }}>
                    <p>© All Rights Reserved | Developed by Muhammad Abu Bakar</p>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;
