require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");


async function adminLogin(req, res ) {

    try {
        
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create a JWT token with a payload containing user data
        const token = jwt.sign({ userId: admin._id, username: admin.username }, process.env.TOKEN_SECRET_KEY , {
            expiresIn: '1h', // Token expiration time 
        });

        // Respond with the JWT token
        res.status(200).json({ token });

    } catch( error ) {
        res.status(500).json({ error: 'Super Admin Login failed' })
    }

}


module.exports = {
    adminLogin
}