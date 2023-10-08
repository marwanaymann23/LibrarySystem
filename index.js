require('dotenv').config();
const express = require('express'); 
const mongoose = require('mongoose');
const Admin = require('./models/admin');
const utilities = require('./utilities/createSuperAdmin');

const app = express();
app.use(express.json()); //  IMP Middleware to parse JSON data
const PORT = process.env.PORT;


// Database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
})
db.once('open', ()=>{
    console.log("Connected to database")
})


// Create Super Admin
utilities.createSuperAdmin();

app.use("", require("./routes/routes"))

app.listen(PORT, () =>{
    console.log(`Server started at http://localhost:${PORT}`);
});