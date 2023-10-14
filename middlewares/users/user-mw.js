const jwt = require('jsonwebtoken');
require('dotenv').config();

function usersMiddleware(req, res, next) {

    const authorizationHeader = req.headers.authorization;


    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authenetication required' })
    }

    // Extract the token from the header (remove "Bearer ")
    const token = authorizationHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        //console.log(decoded)

        if (decoded.role === 'user') {
            next();
        } else {
            res.status(403).json({ error: 'Access denied. Not a user.' });
        }
        
    }catch(error){
        res.status(401).json({error: "Authentication failed. Invalid token"})
    }

}

module.exports = {
    usersMiddleware
}