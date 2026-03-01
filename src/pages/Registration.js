import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Registration = () => {
    const navigate = useNavigate();
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('currentUser'));
                if (!user || !user.token) return;

                // Fetch registered courses
                const myRes = await fetch('/api/courses/mycourses', {
                    headers: { 'x-auth-token': user.token }
                });
                const myData = await myRes.json();
                if (myRes.ok) {
                    setRegisteredCourses(myData.map(c => c.course_code));
                }

                // Fetch all available courses mapped by admin
                const allRes = await fetch('/api/courses', {
                    headers: { 'x-auth-token': user.token }
                });
                const allData = await allRes.json();
                if (allRes.ok) {
                    setAvailableCourses(allData);
                }
            } catch (e) { console.error(e); }
        };
        fetchData();
    }, []);

    const toggleCourse = (code) => {
        const updated = registeredCourses.includes(code)
            ? registeredCourses.filter(c => c !== code)
            : [...registeredCourses, code];
        setRegisteredCourses(updated);
    };

    const handleSave = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const res = await fetch('/api/courses/mycourses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': user.token
                },
                body: JSON.stringify({ courses: registeredCourses })
            });
            if (res.ok) {
                alert('Courses successfully registered!');
                navigate('/');
            } else {
                alert('Error saving courses');
            }
        } catch (e) {
            console.error(e);
            alert('Server error');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div className="main-content" style={{ flex: 1, padding: '30px' }}>
                <div className="content-header" style={{ background: 'linear-gradient(135deg, #e67e22, #2c3e50)', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                    <h1>New Registration</h1>
                    <p>Select courses you want to enroll in this semester</p>
                </div>

                <div className="card" style={{ padding: '30px' }}>
                    <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #e67e22', paddingBottom: '10px' }}>Course Selection</h2>
                    <p style={{ marginBottom: '15px', color: '#7f8c8d' }}>Choose available courses for current term:</p>
                    <div className="course-selection" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                        {availableCourses.length > 0 ? availableCourses.map((course) => (
                            <div
                                key={course.course_code}
                                className="registration-item"
                                style={{ display: 'flex', alignItems: 'center', background: '#f8f9fa', padding: '15px', borderRadius: '8px', cursor: 'pointer', border: registeredCourses.includes(course.course_code) ? '2px solid #e67e22' : '2px solid transparent' }}
                                onClick={() => toggleCourse(course.course_code)}
                            >
                                <div style={{ marginRight: '15px', fontSize: '20px', color: registeredCourses.includes(course.course_code) ? '#e67e22' : '#ddd' }}>
                                    <i className={`fas fa-${registeredCourses.includes(course.course_code) ? 'check-circle' : 'circle'}`}></i>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, color: '#2c3e50' }}>{course.course_code} - Section {course.section}</h4>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#7f8c8d' }}>{course.course_name}</p>
                                    <p style={{ margin: 0, fontSize: '12px', color: '#95a5a6' }}><i className="fas fa-user-tie"></i> {course.teacher_name} | <i className="fas fa-clock"></i> {course.class_day} {course.class_time}</p>
                                </div>
                            </div>
                        )) : (
                            <p style={{ gridColumn: '1 / -1', color: '#7f8c8d', textAlign: 'center', padding: '20px' }}>No courses are currently open for registration.</p>
                        )}
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button className="btn" onClick={handleSave} style={{ background: '#e67e22', border: 'none', padding: '12px 30px', borderRadius: '4px', color: 'white', marginRight: '15px', cursor: 'pointer', fontWeight: 'bold' }}>Complete Registration</button>
                    <button onClick={() => navigate(-1)} className="btn back-btn" style={{ background: '#95a5a6', border: 'none', padding: '12px 30px', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Back to Dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
