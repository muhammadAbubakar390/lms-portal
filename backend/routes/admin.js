const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

router.post('/user', authMiddleware, isAdmin, adminController.addUser);
router.post('/course', authMiddleware, isAdmin, adminController.addCourse);
router.get('/courses', authMiddleware, adminController.getCourses);

module.exports = router;
