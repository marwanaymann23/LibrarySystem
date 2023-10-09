const express = require('express')
const router = express.Router();
const usersAuth = require("../auth/usersAuth");
const adminAuth = require("../auth/adminsAuth");
const superAdminMiddleware = require('../middlewares/superAdmin/supeAdmin-mw');
const superAdminController = require('../controllers/Admins/superAdminController');


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


// SuperAdmin create admins' accounts
router.post(
    "/admin/superadmin/create_admin",
    superAdminMiddleware.superAdminMiddleware,
    superAdminController.createAdmin);

module.exports = router;
