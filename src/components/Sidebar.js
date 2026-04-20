import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ portalType = 'student' }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    const renderHeader = () => {
        if (portalType === 'admin') {
            return (
                <div className="sidebar-header">
                    <h1><i className="fas fa-user-shield"></i> Admin Portal</h1>
                    <p>System Management</p>
                </div>
            );
        } else if (portalType === 'teacher') {
            return (
                <div className="sidebar-header">
                    <h1><i className="fas fa-university"></i> Teacher Portal</h1>
                    <p>LMS Management</p>
                </div>
            );
        } else {
            return (
                <div className="sidebar-header">
                    <h1><i className="fas fa-university"></i> University Portal</h1>
                    <p>Dashboard</p>
                </div>
            );
        }
    };

    const renderMenu = () => {
        if (portalType === 'admin') {
            return (
                <ul className="sidebar-menu">
                    <li className="menu-item"><NavLink to="/admin"><i className="fas fa-tachometer-alt"></i> Dashboard</NavLink></li>
                </ul>
            );
        } else if (portalType === 'teacher') {
            return (
                <ul className="sidebar-menu">
                    <li className="menu-item"><NavLink to="/teacher"><i className="fas fa-chalkboard-teacher"></i> Dashboard</NavLink></li>
                    <li className="menu-item"><NavLink to="/teacher/profile"><i className="fas fa-user-cog"></i> Profile Settings</NavLink></li>
                </ul>
            );
        } else {
            return (
                <ul className="sidebar-menu">
                    <li className="menu-item"><NavLink to="/" end><i className="fas fa-home"></i> Dashboard</NavLink></li>
                    <li className="menu-item"><NavLink to="/profile"><i className="fas fa-user-circle"></i> Profile</NavLink></li>
                    <li className="menu-item"><NavLink to="/courses"><i className="fas fa-book"></i> My Courses</NavLink></li>
                    <li className="menu-item"><NavLink to="/roadmap"><i className="fas fa-map-marked-alt"></i> Road Map</NavLink></li>
                    <li className="menu-item"><NavLink to="/advisor"><i className="fas fa-user-graduate"></i> Student Advisor</NavLink></li>
                </ul>
            );
        }
    };

    return (
        <div className="sidebar">
            {renderHeader()}
            {renderMenu()}
            <div className="logout-container">
                <button className="logout-btn" onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
