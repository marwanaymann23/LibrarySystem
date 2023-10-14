const jwt = require('jsonwebtoken');
require('dotenv').config();

function adminMiddleware(req, res, next) {

    const authorizationHeader = req.headers.authorization;


    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authenetication required' })
    }

    // Extract the token from the header (remove "Bearer ")
    const token = authorizationHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        //console.log(decoded)

        if (decoded.role === 'admin') {
            next();
        } else {
            res.status(403).json({ error: 'Access denied. Not an admin.' });
        }
        
    }catch(error){
        res.status(401).json({error: "Authentication failed. Invalid token"})
    }
}

module.exports = {
    adminMiddleware
}