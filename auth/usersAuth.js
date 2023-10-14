require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

async function registerUser(req, res) {
    try {
        const { username , email, password } = req.body

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new User
        const newUser = new User({ username, email, password:hashedPassword })
        await newUser.save();

        res.status(201).json({ message: 'User registred successfully' })
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

async function loginUser(req, res) {
    try {

        const { username, password } = req.body

        // Search in database for a user by the given username
        const user = await User.findOne({ username })

        // If the user doesn't exist or the password is incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create a JWT token with a payload containing user data
        const token = jwt.sign({ 
            userId: user._id,
            username: user.username ,
            role: 'user'
        }, process.env.TOKEN_SECRET_KEY , {
            expiresIn: '1h', // Token expiration time 
        });

        // Respond with the JWT token
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' })
    }
}

module.exports = {
    registerUser,
    loginUser
}