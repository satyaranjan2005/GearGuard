const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all equipments
const getAllEquipments = async (_req, res) => {
    try {
        const equipments = await prisma.equipment.findMany({
            include: {
                department: true,
                employee: true,
                team: true,
                technician: true,
            },
        });
        res.status(200).json(equipments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get equipment by ID
const getEquipmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await prisma.equipment.findUnique({
            where: { id: parseInt(id) },
            include: {
                department: true,
                employee: true,
                team: true,
                technician: true,
                requests: true,
            },
        });
        
        if (!equipment) {
            return res.status(404).json({ error: 'Equipment not found' });
        }
        
        res.status(200).json(equipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new equipment
const createEquipment = async (req, res) => {
    try {
        const { name, serialNumber, purchaseDate, warrantyExpiry, location, departmentId, employeeId, teamId } = req.body;
        
        // Automatically assign a technician (e.g., least busy or round-robin)
        const technician = await prisma.technician.findFirst({
            orderBy: {
            equipments: {
                _count: 'asc'
            }
            }
        });
        
        const equipment = await prisma.equipment.create({
            data: {
            name,
            serialNumber,
            purchaseDate: new Date(purchaseDate),
            warrantyExpiry: new Date(warrantyExpiry),
            location,
            departmentId: parseInt(departmentId),
            employeeId: employeeId ? parseInt(employeeId) : null,
            teamId: parseInt(teamId),
            },
            include: {
            department: true,
            employee: true,
            team: true,
            technician: true,
            },
        });
        
        res.status(201).json(equipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete equipment
const deleteEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        
        await prisma.equipment.delete({
            where: { id: parseInt(id) },
        });
        
        res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEquipmentByDepartment = async (req, res) => {
    try {
        const departmentId = parseInt(req.params.id);

        // Check if department exists
        const department = await prisma.department.findUnique({
            where: { id: departmentId }
        });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        // Get all equipment for the department
        const equipment = await prisma.equipment.findMany({
            where: { departmentId: departmentId },
            include: {
                assignedTo: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.status(200).json({
            department: department.name,
            equipment
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getEquipmentByUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        // Check if user exists
        const user = await prisma.employee.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get all equipment for the user
        const equipment = await prisma.equipment.findMany({
            where: { employeeId: userId },
            include: {
                department: true,
                team: true,
                technician: true
            }
        });

        res.status(200).json({
            user: user.name,
            equipment
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllEquipments,
    getEquipmentById,
    createEquipment,
    deleteEquipment,
    getEquipmentByDepartment,
};