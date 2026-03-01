const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // Check if user exists
        const [existingUsers] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email || '']);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const [result] = await db.query(
            'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, email || null, 'Student']
        );

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        let users = [];
        if (email) {
            [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        } else {
            [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        }

        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = users[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                });
            }
        );
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    const { username, password, profile_pic } = req.body;
    try {
        const userId = req.user.id;

        // Build query parts conditionally
        let updateFields = [];
        let queryParams = [];

        if (username) {
            updateFields.push('username = ?');
            queryParams.push(username);
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.push('password = ?');
            queryParams.push(hashedPassword);
        }
        if (profile_pic !== undefined) {
            // Allows setting it to null or a URL string
            updateFields.push('profile_pic = ?');
            queryParams.push(profile_pic);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        queryParams.push(userId); // for the WHERE clause

        await db.query(`UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`, queryParams);

        // Fetch the updated user omitting password
        const [users] = await db.query('SELECT id, username, email, role, profile_pic FROM users WHERE id = ?', [userId]);

        res.json({ message: 'Profile updated successfully', user: users[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const [users] = await db.query('SELECT id, username, email, role, profile_pic FROM users WHERE id = ?', [userId]);

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user: users[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
