import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Profile = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        // Mock profile data
        const mockUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        setUsername(mockUser.username || 'Student User');
        setProfilePic(mockUser.profile_pic || '');
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        // Mock update logic
        const updatedUser = { ...currentUser, username, profile_pic: profilePic };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        alert('Profile updated successfully (Mock)!');
        setPassword('');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar portalType="student" />
            <div className="main-content" style={{ flex: 1, padding: '30px', marginLeft: '280px' }}>
                <div className="content-header" style={{ background: 'linear-gradient(135deg, #3498db, #2c3e50)', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                    <h1>Student Profile Settings</h1>
                    <p>Update your account details and profile picture</p>
                </div>

                <div className="card" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        {profilePic ? (
                            <img src={profilePic} alt="Profile" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #3498db' }} />
                        ) : (
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '40px', color: '#ccc', border: '3px solid #3498db' }}>
                                <i className="fas fa-user-circle"></i>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleUpdate}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>Profile Picture URL</label>
                            <input
                                type="text"
                                placeholder="https://example.com/photo.jpg"
                                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
                                value={profilePic}
                                onChange={e => setProfilePic(e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>Username / Full Name</label>
                            <input
                                type="text"
                                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>New Password (leave blank to keep current)</label>
                            <input
                                type="password"
                                placeholder="Enter a new password"
                                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" style={{ width: '100%', background: '#3498db', color: 'white', padding: '14px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>Save Changes</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Profile;
