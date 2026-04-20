import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const TeacherPortal = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');

    const students = [
        { id: 'S101', name: 'Muhammad Abubakar', attendance: '95%', grade: 'A' },
        { id: 'S102', name: 'Muhammad Usman', attendance: '90%', grade: 'B+' },
        { id: 'S103', name: 'Muhammad Abdullah', attendance: '85%', grade: 'A-' }
    ];

    const assignments = [
        { id: 'A1', title: 'Calculus Quiz 1', dueDate: '2026-04-25', status: 'Graded' },
        { id: 'A2', title: 'Programming Project', dueDate: '2026-05-10', status: 'Pending' }
    ];

    const renderDashboard = () => (
        <div className="dashboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '25px' }}>
            <div className="card" onClick={() => setActiveSection('students')} style={{ padding: '25px' }}>
                <h2 style={{ borderBottom: '2px solid #34495e', paddingBottom: '10px', marginBottom: '15px' }}><i className="fas fa-users"></i> Student Management</h2>
                <p>Monitor student progress and attendance</p>
                <ul style={{ marginTop: '15px', listStyle: 'none', paddingLeft: '5px' }}>
                    <li style={{ cursor: 'pointer', color: '#3498db', marginBottom: '8px' }}><i className="fas fa-eye"></i> View student list</li>
                    <li style={{ cursor: 'pointer', color: '#3498db' }}><i className="fas fa-check-square"></i> Mark attendance</li>
                </ul>
            </div>
            <div className="card" onClick={() => setActiveSection('grades')} style={{ padding: '25px' }}>
                <h2 style={{ borderBottom: '2px solid #34495e', paddingBottom: '10px', marginBottom: '15px' }}><i className="fas fa-edit"></i> Grades & Assignments</h2>
                <p>Manage curriculum and student evaluation</p>
                <ul style={{ marginTop: '15px', listStyle: 'none', paddingLeft: '5px' }}>
                    <li style={{ cursor: 'pointer', color: '#3498db', marginBottom: '8px' }}><i className="fas fa-plus-circle"></i> Post new assignment</li>
                    <li style={{ cursor: 'pointer', color: '#3498db' }}><i className="fas fa-file-invoice"></i> Grade submissions</li>
                </ul>
            </div>
        </div>
    );

    const renderStudents = () => (
        <div className="card" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2><i className="fas fa-users"></i> Student List</h2>
                <button onClick={() => setActiveSection('dashboard')} className="btn" style={{ background: '#95a5a6', fontSize: '14px', padding: '5px 15px', marginTop: 0 }}>Back</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #34495e' }}>
                        <th style={{ padding: '10px' }}>ID</th>
                        <th style={{ padding: '10px' }}>Name</th>
                        <th style={{ padding: '10px' }}>Attendance</th>
                        <th style={{ padding: '10px' }}>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>{s.id}</td>
                            <td style={{ padding: '10px' }}>{s.name}</td>
                            <td style={{ padding: '10px' }}>{s.attendance}</td>
                            <td style={{ padding: '10px' }}>{s.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderGrades = () => (
        <div className="card" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2><i className="fas fa-edit"></i> Assignments</h2>
                <button onClick={() => setActiveSection('dashboard')} className="btn" style={{ background: '#95a5a6', fontSize: '14px', padding: '5px 15px', marginTop: 0 }}>Back</button>
            </div>
            <div style={{ display: 'grid', gap: '15px' }}>
                {assignments.map(a => (
                    <div key={a.id} style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', borderLeft: '4px solid #3498db' }}>
                        <div>
                            <h4 style={{ margin: 0 }}>{a.title}</h4>
                            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Due: {a.dueDate}</p>
                        </div>
                        <span style={{ background: a.status === 'Graded' ? '#2ecc71' : '#f1c40f', color: 'white', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', height: 'fit-content' }}>{a.status}</span>
                    </div>
                ))}
            </div>
            <button className="btn" style={{ marginTop: '20px', width: '100%', background: '#34495e' }}>Create New Assignment</button>
        </div>
    );

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar portalType="teacher" />
            <div className="main-content" style={{ flex: 1, padding: '30px' }}>
                <div className="content-header" style={{ background: 'linear-gradient(135deg, #34495e, #2c3e50)', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                    <h1>Teacher Portal</h1>
                    <p>{activeSection === 'dashboard' ? 'Welcome, Professor' : activeSection === 'students' ? 'Student Management' : 'Grades & Assignments'}</p>
                </div>

                {activeSection === 'dashboard' && renderDashboard()}
                {activeSection === 'students' && renderStudents()}
                {activeSection === 'grades' && renderGrades()}

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button onClick={() => navigate('/login')} className="btn back-btn" style={{ background: '#95a5a6', border: 'none', padding: '10px 20px', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default TeacherPortal;
