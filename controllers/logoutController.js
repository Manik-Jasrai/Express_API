const User = require('../model/User');

const handleLogout = async (req,res) => {
    const cookie = req.cookies;
    //is no refresh token no problem
    if( !cookie || !cookie.jwt ) return res.sendStatus( 204 ); //no content

    const refreshToken = cookie.jwt;
    const validUser = await User.findOne({ refreshToken }).exec();

    if( !validUser ) {
        //clear the cookie
        res.clearCookie('jwt',{ httpOnly:true});
        res.sendStatus( 204 );
    }

    //a user with a valid cookie exist 
    //we need to delete that refresh token
    validUser.refreshToken = '';
    await validUser.save();
    res.clearCookie('jwt',{ httpOnly:true});
    res.sendStatus( 204 );
}

module.exports = { handleLogout };