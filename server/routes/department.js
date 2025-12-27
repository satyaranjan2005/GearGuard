const express = require('express');
const Department = require('../controllers/department');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// POST /api/departments - Create a new department
router.post('/',Department.createDepartment);
// GET /api/departments - Get all departments
router.get('/', authMiddleware,Department.getAllDepartments);

// assign users to department
router.post('/assign', authMiddleware, Department.assignUsersToDepartment);

module.exports = router;