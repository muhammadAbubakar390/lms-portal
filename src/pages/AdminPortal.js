import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminPortal = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Form inputs state
    const [userType, setUserType] = useState('Student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [section, setSection] = useState('');
    const [classDay, setClassDay] = useState('');
    const [classTime, setClassTime] = useState('');
    const [room, setRoom] = useState('');

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': currentUser.token
                },
                body: JSON.stringify({ role: userType, username, password, email })
            });
            const data = await res.json();
            if (res.ok) {
                alert('User added successfully');
                setUsername(''); setPassword(''); setEmail('');
            } else {
                alert(data.message || 'Error adding user');
            }
        } catch (error) {
            console.error(error);
            alert('Server error');
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': currentUser.token
                },
                body: JSON.stringify({
                    course_code: courseCode,
                    course_name: courseName,
                    teacher_name: teacherName,
                    section,
                    class_day: classDay,
                    class_time: classTime,
                    room
                })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Course created successfully');
                setCourseCode(''); setCourseName(''); setTeacherName(''); setSection(''); setClassDay(''); setClassTime(''); setRoom('');
            } else {
                alert(data.message || 'Error creating course');
            }
        } catch (error) {
            console.error(error);
            alert('Server error');
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar portalType="admin" />
            <div className="main-content" style={{ flex: 1, padding: '30px' }}>
                <div className="content-header" style={{ background: 'linear-gradient(135deg, #8e44ad, #2c3e50)', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                    <h1>Admin Dashboard</h1>
                    <p>Manage users and curriculum</p>
                </div>

                <div className="dashboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '25px' }}>
                    {/* Add User Form */}
                    <div className="card" style={{ padding: '25px' }}>
                        <h2 style={{ borderBottom: '2px solid #8e44ad', paddingBottom: '10px', marginBottom: '20px', color: '#2c3e50' }}>Add New User</h2>
                        <form onSubmit={handleAddUser}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Role</label>
                                <select
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    value={userType} onChange={(e) => setUserType(e.target.value)} required
                                >
                                    <option value="Student">Student</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                                <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} value={username} onChange={e => setUsername(e.target.value)} required />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                                <input type="email" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                                <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" style={{ width: '100%', background: '#8e44ad', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Create User</button>
                        </form>
                    </div>

                    {/* Add Course Form */}
                    <div className="card" style={{ padding: '25px' }}>
                        <h2 style={{ borderBottom: '2px solid #8e44ad', paddingBottom: '10px', marginBottom: '20px', color: '#2c3e50' }}>Create Section / Course</h2>
                        <form onSubmit={handleAddCourse}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Course Code</label>
                                    <input type="text" placeholder="e.g. CS0152" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} value={courseCode} onChange={e => setCourseCode(e.target.value)} required />
                                </div>
                                <div style={{ flex: 2 }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Course Name</label>
                                    <input type="text" placeholder="e.g. Software Architecture" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} value={courseName} onChange={e => setCourseName(e.target.value)} required />
                                </div>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Faculty / Teacher Name</label>
                                <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} value={teacherName} onChange={e => setTeacherName(e.target.value)} required />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Section</label>
                                    <input type="text" placeholder="e.g. A" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} value={section} onChange={e => setSection(e.target.value)} required />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Room</label>
                                    <input type="text" placeholder="e.g. Lab 2" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} value={room} onChange={e => setRoom(e.target.value)} required />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Class Day</label>
                                    <input type="text" placeholder="e.g. Monday" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} value={classDay} onChange={e => setClassDay(e.target.value)} required />
                                </div>
                                <div style={{ flex: 2 }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Class Time</label>
                                    <input type="text" placeholder="e.g. 09:30 PM - 11:00 PM" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} value={classTime} onChange={e => setClassTime(e.target.value)} required />
                                </div>
                            </div>
                            <button type="submit" style={{ width: '100%', background: '#8e44ad', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Course Schedule</button>
                        </form>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button onClick={() => navigate('/login')} className="btn back-btn" style={{ background: '#95a5a6', border: 'none', padding: '10px 20px', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPortal;
