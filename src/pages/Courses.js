import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Courses = () => {
    const navigate = useNavigate();
    const [registeredCourses, setRegisteredCourses] = React.useState([]);

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('currentUser'));
                if (!user || !user.token) return;
                const res = await fetch('/api/courses/mycourses', {
                    headers: { 'x-auth-token': user.token }
                });
                const data = await res.json();
                if (res.ok) {
                    setRegisteredCourses(data);
                }
            } catch (e) { console.error(e); }
        };
        fetchCourses();
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="main-content" style={{ flex: 1, padding: '30px' }}>
                <div className="content-header" style={{ background: 'linear-gradient(135deg, #2980b9, #2c3e50)', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                    <h1>My Registered Courses</h1>
                    <p>Current Semester Enrolled List</p>
                </div>

                <div className="dashboard">
                    {registeredCourses.length > 0 ? (
                        <div className="course-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                            {registeredCourses.map(course => (
                                <div key={course.course_code} className="card" style={{ padding: '20px' }}>
                                    <h3 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>{course.course_code} - Sec {course.section}</h3>
                                    <p style={{ fontWeight: 'bold', margin: '10px 0' }}>{course.course_name}</p>
                                    <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '4px', marginTop: '15px' }}>
                                        <p style={{ margin: '5px 0' }}><i className="fas fa-user-tie"></i> {course.teacher_name}</p>
                                        <p style={{ margin: '5px 0' }}><i className="fas fa-clock"></i> {course.class_day} {course.class_time}</p>
                                        <p style={{ margin: '5px 0' }}><i className="fas fa-map-marker-alt"></i> Room {course.room}</p>
                                    </div>
                                    <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                                        <p style={{ color: '#3498db', cursor: 'pointer', margin: '5px 0' }}><i className="fas fa-book"></i> View Course Content</p>
                                        <p style={{ color: '#3498db', cursor: 'pointer', margin: '5px 0' }}><i className="fas fa-file-pdf"></i> Download Syllabus</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                            <p style={{ fontSize: '18px', color: '#7f8c8d' }}>No courses registered yet. Please go to Registration.</p>
                            <button className="btn" onClick={() => navigate('/registration')} style={{ background: '#3498db', border: 'none', padding: '10px 20px', borderRadius: '4px', color: 'white', marginTop: '20px', cursor: 'pointer' }}>Go to Registration</button>
                        </div>
                    )}
                </div>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button onClick={() => navigate(-1)} className="btn back-btn" style={{ background: '#95a5a6', border: 'none', padding: '10px 20px', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Back to Dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default Courses;
