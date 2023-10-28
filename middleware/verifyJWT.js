const jwt = require('jsonwebtoken');

const verifyJWT = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if( !authHeader ) return res.sendStatus(401);
    //header has singing algo and the token so we extract the token from it
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err , decoded) => {
            if ( err ) return res.sendStatus(403); //invalid user
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
};

module.exports = verifyJWT;