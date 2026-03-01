const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.addUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const [existing] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email || '']);
        if (existing.length > 0) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email || null, hashedPassword, role]
        );

        res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addCourse = async (req, res) => {
    const { course_code, course_name, teacher_name, section, class_day, class_time, room } = req.body;
    try {
        await db.query(
            'INSERT INTO courses (course_code, course_name, teacher_name, section, class_day, class_time, room) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [course_code, course_name, teacher_name, section, class_day, class_time, room]
        );
        res.status(201).json({ message: 'Course added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const [courses] = await db.query('SELECT * FROM courses');
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
