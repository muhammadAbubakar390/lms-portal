import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Advisor = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="main-content" style={{ flex: 1, padding: '30px' }}>
                <div className="content-header" style={{ background: 'linear-gradient(135deg, #16a085, #2c3e50)', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                    <h1>Student Advisor Portal</h1>
                    <p>Schedule meetings and seek guidance</p>
                </div>

                <div className="dashboard">
                    <div className="card" style={{ width: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <img
                                src="https://ui-avatars.com/api/?name=Dr.+Usman&background=16a085&color=fff&size=150"
                                alt="Advisor"
                                style={{ borderRadius: '50%', marginBottom: '20px', border: '5px solid #16a085' }}
                            />
                            <h2>Dr. Usman Ali</h2>
                            <p style={{ color: '#7f8c8d', marginBottom: '15px' }}>Senior Student Advisor (Computer Science Dept)</p>
                            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', textAlign: 'left', marginBottom: '20px' }}>
                                <p><i className="fas fa-envelope"></i> admin@university.edu</p>
                                <p><i className="fas fa-clock"></i> Office Hours: Mon-Fri, 10:00 AM - 12:00 PM</p>
                                <p><i className="fas fa-map-marker-alt"></i> Office No: 402, Block C, Computer Science Dept</p>
                            </div>
                            <button className="btn" style={{ background: '#16a085', border: 'none', padding: '10px 20px', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Book an Appointment</button>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button onClick={() => navigate(-1)} className="btn back-btn" style={{ background: '#95a5a6', border: 'none', padding: '10px 20px', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Back to Dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default Advisor;
