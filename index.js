const express = require('express'); 
const mongoose = require('mongoose');
const Admin = require('./models/admin');

const app = express();
const PORT = process.env.PORT || 4000;


app.use("", require("./routes/routes"))

app.listen(PORT, () =>{
    console.log(`Server started at http://localhost:${PORT}`);
});