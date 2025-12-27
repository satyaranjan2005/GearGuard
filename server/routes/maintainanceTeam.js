const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const maintenanceTeamController = require('../controllers/maintainanceTeam');

// Get all maintenance teams
router.get('/', auth, maintenanceTeamController.getAllTeams);

// Get single maintenance team by ID
router.get('/:id', auth, maintenanceTeamController.getTeamById);

// Create new maintenance team
router.post('/', maintenanceTeamController.createTeam);

// Update maintenance team
router.put('/:id', auth, maintenanceTeamController.updateTeam);

// Delete maintenance team
router.delete('/:id', auth, maintenanceTeamController.deleteTeam);

// Add technician to maintenance team
router.post('/:id/technicians', auth, maintenanceTeamController.addTechnician);

// Remove technician from maintenance team
router.delete('/:id/technicians/:technicianId', auth, maintenanceTeamController.removeTechnician);

module.exports = router;
