const jwt = require('jsonwebtoken');
require('dotenv').config();

function superAdminMiddleware(req, res, next) {

    const authorizationHeader = req.headers.authorization;


    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authenetication required' })
    }

    // Extract the token from the header (remove "Bearer ")
    const token = authorizationHeader.split(' ')[1];

    try{
        // Verify the token and decode its payload
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        //console.log(decoded)

        // Check if the decoded payload contains the "superadmin" role
        if (decoded.role === 'superadmin') {
            // User is a super admin, allow access to the next middleware or route
            next();
        } else {
            res.status(403).json({ error: 'Access denied. Not a super admin.' });
        }
    } catch(error){
        console.error('Token verification error:', error); // Log the error for debugging
        res.status(401).json({ error: 'Authentication failed. Invalid token' });
    }
}

module.exports = {
    superAdminMiddleware
}