const express = require('express')
const router = express.Router();
const usersAuth = require("../auth/usersAuth");
const adminAuth = require("../auth/adminsAuth");


// Home Route
router.get("/", (req, res) => {
    res.send("Home Screen")
})

// Create new User Route
router.post("/users/create_new_user", usersAuth.registerUser)

// Login User
router.post("/users/login", usersAuth.loginUser)

// Admin Login
router.post("/admin/login", adminAuth.adminLogin)


module.exports = router;
