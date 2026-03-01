const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, courseController.getAllCourses);
router.get('/mycourses', authMiddleware, courseController.getStudentCourses);
router.post('/mycourses', authMiddleware, courseController.updateStudentCourses);

module.exports = router;
