const express = require('express')
const router = express.Router();
const adminAuth = require("../auth/adminsAuth");
const superAdminMiddleware = require('../middlewares/superAdmin/supeAdmin-mw');
const superAdminController = require('../controllers/Admins/superAdminController');
const adminMiddleware = require("../middlewares/admins/admin-mw");
const adminController = require("../controllers/Admins/adminController");

// Home Route
router.get("/", (req, res) => {
    res.send("Home Screen")
})

// Start Admins Routes

// Admin Login
router.post("/admin/login", adminAuth.adminLogin)

// SuperAdmin create admins' accounts
router.post(
    "/admin/superadmin/create_admin",
    superAdminMiddleware.superAdminMiddleware,
    superAdminController.createAdmin);

// Admin creates books
router.post(
    "/admin/create_book",
    adminMiddleware.adminMiddleware,
    adminController.CreateBook);

// End Admins Routes

module.exports = router;
