import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [activeTab, setActiveTab] = useState('student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.loggedIn) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        // Mock login logic for frontend-only deployment (Vercel)
        let mockUser = {
            id: 1,
            username: username || 'User',
            email: email || 'user@example.com',
            role: 'Student',
            loggedIn: true,
            token: 'mock-jwt-token'
        };

        if (activeTab === 'staff') {
            // Check for hardcoded staff credentials
            if (email === 'admin@university.edu' && password === 'admin123') {
                mockUser.role = 'Admin';
                mockUser.username = 'Admin User';
            } else if (email === 'teacher@university.edu' && password === 'password123') {
                mockUser.role = 'Teacher';
                mockUser.username = 'Teacher User';
            } else {
                alert('Invalid staff credentials! \n\nTry: \nadmin@university.edu / admin123 \nteacher@university.edu / password123');
                return;
            }
        } else {
            // For students, let them login with any credentials for demo purposes
            if (!username || !password) {
                alert('Please enter username and password');
                return;
            }
            mockUser.role = 'Student';
            mockUser.username = username;
        }

        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        
        if (mockUser.role === 'Admin') {
            navigate('/admin');
        } else if (mockUser.role === 'Teacher') {
            navigate('/teacher');
        } else {
            navigate('/');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Mock registration logic
        alert('Account created successfully (Mock)! You can now login.');
        setIsRegistering(false);
    };

    return (
        <div className="login-page" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #2c3e50, #3498db)' }}>
            <div className="login-container" style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', width: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>University Portal</h2>

                <div className="tabs" style={{ display: 'flex', marginBottom: '20px', borderBottom: '2px solid #eee' }}>
                    <button
                        style={{ flex: 1, padding: '10px', border: 'none', background: 'none', borderBottom: activeTab === 'student' ? '2px solid #3498db' : 'none', fontWeight: activeTab === 'student' ? 'bold' : 'normal', cursor: 'pointer' }}
                        onClick={() => setActiveTab('student')}
                    >Student</button>
                    <button
                        style={{ flex: 1, padding: '10px', border: 'none', background: 'none', borderBottom: activeTab === 'staff' ? '2px solid #3498db' : 'none', fontWeight: activeTab === 'staff' ? 'bold' : 'normal', cursor: 'pointer' }}
                        onClick={() => setActiveTab('staff')}
                    >Staff</button>
                </div>

                {isRegistering ? (
                    <form onSubmit={handleRegister}>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                            <input
                                type="text"
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                            <input
                                type="password"
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="login-btn" style={{ width: '100%', padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Register</button>
                        <p style={{ textAlign: 'center', marginTop: '15px', color: '#666' }}>Already have an account? <span style={{ color: '#3498db', cursor: 'pointer' }} onClick={() => setIsRegistering(false)}>Login here</span></p>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        {activeTab === 'student' ? (
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                                <input
                                    type="text"
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        ) : (
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Staff / Admin Email</label>
                                <input
                                    type="email"
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        )}
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                            <input
                                type="password"
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="login-btn" style={{ width: '100%', padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
                        {activeTab === 'student' && (
                            <p style={{ textAlign: 'center', marginTop: '15px', color: '#666' }}>New User? <span style={{ color: '#3498db', cursor: 'pointer' }} onClick={() => setIsRegistering(true)}>Register here</span></p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
