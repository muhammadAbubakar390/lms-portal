import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ portalType = 'student' }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    if (portalType === 'admin') {
        return (
            <div className="sidebar" style={{ backgroundColor: '#2c3e50', width: '280px', color: 'white', display: 'flex', flexDirection: 'column' }}>
                <div className="sidebar-header" style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h1><i className="fas fa-user-shield"></i> Admin Portal</h1>
                    <p>System Management</p>
                </div>
                <ul className="sidebar-menu" style={{ flex: 1, listStyle: 'none', padding: 0 }}>
                    <li className="menu-item"><NavLink to="/admin" style={{ padding: '15px 20px', display: 'block', color: 'white', textDecoration: 'none' }}><i className="fas fa-tachometer-alt"></i> Dashboard</NavLink></li>
                </ul>
                <div className="logout-container" style={{ padding: '20px' }}>
                    <button className="logout-btn" onClick={logout} style={{ width: '100%', background: '#e74c3c', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        );
    }

    if (portalType === 'teacher') {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <h1><i className="fas fa-university"></i> Teacher Portal</h1>
                    <p>LMS Management</p>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-item"><NavLink to="/teacher"><i className="fas fa-chalkboard-teacher"></i> Dashboard</NavLink></li>
                    <li className="menu-item"><NavLink to="/teacher/courses"><i className="fas fa-book-open"></i> Manage Courses</NavLink></li>
                    <li className="menu-item"><NavLink to="/teacher/assignments"><i className="fas fa-file-alt"></i> Assignments</NavLink></li>
                    <li className="menu-item"><NavLink to="/teacher/quizzes"><i className="fas fa-question-circle"></i> Quizzes</NavLink></li>
                    <li className="menu-item"><NavLink to="/teacher/grades"><i className="fas fa-graduation-cap"></i> Grades</NavLink></li>
                    <li className="menu-item"><NavLink to="/teacher/materials"><i className="fas fa-folder-open"></i> Course Materials</NavLink></li>
                    <li className="menu-item"><NavLink to="/teacher/profile"><i className="fas fa-user-cog"></i> Profile Settings</NavLink></li>
                </ul>
                <div className="logout-container" style={{ padding: '20px' }}>
                    <button className="logout-btn" onClick={logout} style={{ width: '100%' }}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="sidebar" style={{ position: 'fixed', height: '100vh', overflowY: 'auto' }}>
            <div className="sidebar-header">
                <h1><i className="fas fa-university"></i> University Portal</h1>
                <p>Dashboard</p>
            </div>

            <ul className="sidebar-menu">
                <li className="menu-item">
                    <NavLink to="/" end><i className="fas fa-home"></i> Dashboard</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/profile"><i className="fas fa-user-circle"></i> Profile</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/courses"><i className="fas fa-book"></i> My Courses</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/request"><i className="fas fa-envelope"></i> Request</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/payments"><i className="fas fa-credit-card"></i> Payments</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/roadmap"><i className="fas fa-map-marked-alt"></i> Road Map</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/e-appointment"><i className="fas fa-calendar-check"></i> E-Appointment</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/advisor"><i className="fas fa-user-graduate"></i> Student Advisor</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
