const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin');

const createAdmin = async (req, res) => {
    
    try{

        const { username, password } = req.body

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)

        const admin = new Admin({ username, password:hashedPassword })
        await admin.save()

        res.status(201).json({ message: 'You have been created admin account successfully' })

    } catch(error){
        console.error(error)
        res.status(401).json( {error: 'Can not create admin account'})
    }

}

module.exports = {
    createAdmin
}