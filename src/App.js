import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LMSPortal from './pages/LMSPortal';
import TeacherPortal from './pages/TeacherPortal';
import TeacherProfile from './pages/TeacherProfile';
import AdminPortal from './pages/AdminPortal';
import Advisor from './pages/Advisor';
import Courses from './pages/Courses';
import Registration from './pages/Registration';
import Profile from './pages/Profile';

const PrivateRoute = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.loggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/lms" element={<PrivateRoute><LMSPortal /></PrivateRoute>} />
                <Route path="/teacher" element={<PrivateRoute><TeacherPortal /></PrivateRoute>} />
                <Route path="/teacher/profile" element={<PrivateRoute><TeacherProfile /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/admin" element={<PrivateRoute><AdminPortal /></PrivateRoute>} />
                <Route path="/advisor" element={<PrivateRoute><Advisor /></PrivateRoute>} />
                <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
                <Route path="/registration" element={<PrivateRoute><Registration /></PrivateRoute>} />
            </Routes>
        </Router >
    );
};

export default App;
