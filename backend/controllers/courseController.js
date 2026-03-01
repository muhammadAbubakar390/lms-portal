const db = require('../config/db');

// Get registered courses for a student
exports.getStudentCourses = async (req, res) => {
    try {
        const studentId = req.user.id;
        const [courses] = await db.query(
            `SELECT c.* FROM student_courses sc 
             JOIN courses c ON sc.course_code = c.course_code 
             WHERE sc.student_id = ?`,
            [studentId]
        );
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update student courses
exports.updateStudentCourses = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { courses } = req.body; // array of course codes

        // For simplicity, we can delete all existing and re-insert 
        // This isn't perfect for a production app, but works here
        await db.query('DELETE FROM student_courses WHERE student_id = ?', [studentId]);

        if (courses && courses.length > 0) {
            const values = courses.map(code => [studentId, code]);
            await db.query('INSERT INTO student_courses (student_id, course_code) VALUES ?', [values]);
        }

        res.json({ message: 'Courses updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all available courses
exports.getAllCourses = async (req, res) => {
    try {
        const [courses] = await db.query('SELECT * FROM courses');
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
