const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Home Screen")
})

module.exports = router;
