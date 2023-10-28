const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async ( req,res ) => {
    const cookie = req.cookies;
    if( !cookie || !cookie.jwt ) return res.sendStatus(401);//Unauthorised
    //cookie.jwt exists then
    const refreshToken = cookie.jwt;

    const validUser = await User.findOne({ refreshToken }).exec();
    if( !validUser ) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        ( err , decoded ) => {
            if( err || decoded.username !== validUser.username ) return res.sendStatus(403);
            const roles = Object.values(validUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "username" : validUser.username,
                        "roles" : roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn : '30s' }
            );
            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken };