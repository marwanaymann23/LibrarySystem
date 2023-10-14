const express = require('express')
const router = express.Router();
const usersAuth = require("../auth/usersAuth");
const adminAuth = require("../auth/adminsAuth");
const superAdminMiddleware = require('../middlewares/superAdmin/supeAdmin-mw');
const superAdminController = require('../controllers/Admins/superAdminController');
const adminMiddleware = require("../middlewares/admins/admin-mw");
const adminController = require("../controllers/Admins/adminController");
const userMiddleware = require("../middlewares/users/user-mw");
const userController = require("../controllers/Users/userController");

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



// Start Users Routes

// Create new User Route
router.post("/users/create_new_user", usersAuth.registerUser)

// Login User
router.post("/users/login", usersAuth.loginUser)

// Get All books
router.get("/users/get_all_books", userMiddleware.usersMiddleware, userController.getAllBooks)

// End Users Routes



module.exports = router;
