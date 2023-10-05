const mongoose = require('mongoose');
const Admin = require('../models/admin');

async function createSuperAdmin() {
    try {
        // Check if a super admin already exists
        const superAdminExists = await Admin.findOne({ role: 'superadmin' });

        if (!superAdminExists) {
            const superAdminData = {
                username: 'superadmin',
                password: 'superadmin', 
                role: 'superadmin',
            };

            // Create the super admin
            const superAdmin = new Admin(superAdminData);
            await superAdmin.save();
            console.log('Super admin created successfully.');
        } else {
            console.log('Super admin already exists.');
        }
    } catch (error) {
    console.error('Error creating super admin:', error);
    }
}

module.exports = {
    createSuperAdmin,
};