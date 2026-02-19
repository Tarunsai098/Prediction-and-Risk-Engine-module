const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// ADMIN DASHBOARD
router.get('/admin', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const [students] = await db.query('SELECT id, name, email, role FROM users WHERE role="student"');
        const [counselors] = await db.query('SELECT id, name, email FROM users WHERE role="counselor"');
        res.json({ students, counselors });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// COUNSELOR DASHBOARD
router.get('/counselor', authenticateToken, authorizeRoles('counselor'), async (req, res) => {
    try {
        const [students] = await db.query('SELECT u.id, u.name, u.email, r.risk_level FROM users u LEFT JOIN risk r ON u.id=r.student_id WHERE u.role="student"');
        res.json({ students });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// STUDENT DASHBOARD
router.get('/student', authenticateToken, authorizeRoles('student'), async (req, res) => {
    try {
        const [attendance] = await db.query('SELECT date, status FROM attendance WHERE student_id=?', [req.user.id]);
        const [risk] = await db.query('SELECT risk_level, score FROM risk WHERE student_id=?', [req.user.id]);
        res.json({ attendance, risk: risk[0] || { risk_level: 'low', score: 0 } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
