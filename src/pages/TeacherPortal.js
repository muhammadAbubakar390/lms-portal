import React from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const TeacherPortal = () => {
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar portalType="teacher" />
            <div className="main-content" style={{ flex: 1, padding: '30px' }}>
                <div className="content-header" style={{ background: 'linear-gradient(135deg, #34495e, #2c3e50)', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                    <h1>Teacher Dashboard</h1>
                    <p>Welcome, Professor</p>
                </div>
                <div className="dashboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                    <div className="card">
                        <h2><i className="fas fa-users"></i> Student Management</h2>
                        <ul><li>View Students</li><li>Manage Attendance</li></ul>
                    </div>
                    <div className="card">
                        <h2><i className="fas fa-edit"></i> Grades & Assignments</h2>
                        <ul><li>Post New Assignment</li><li>Grade Submissions</li></ul>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button onClick={() => navigate('/login')} className="btn back-btn" style={{ background: '#95a5a6', border: 'none', padding: '10px 20px', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default TeacherPortal;
