
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
//LOGIN page
//1.check for valid input
//2. Check for usern ame
//3.Compare password 
//4.Provide login

const handleLogin = async (req,res)=>{
    const {user , pwd} = req.body;
    if(!(user && pwd)) return res.status(400).json({'message':`User and password required`});

    const validUser = await User.findOne({ username : user }).exec();
    if (!validUser) return res.sendStatus(401);
    const validPass = await bcrypt.compare(pwd,validUser.password); 
    
    if  (validPass) {
        //create JWT
        const roles = Object.values(validUser.roles);
        const accessToken = jwt.sign(
            {
                "UserInfo" : {
                    "username" : validUser.username,
                    "roles" : roles
                }
            },//payload
            process.env.ACCESS_TOKEN_SECRET,//key
            { expiresIn : '30s'}//options
        );
        const refreshToken = jwt.sign(
            { "username":validUser.username},//payload
            process.env.REFRESH_TOKEN_SECRET,//key
            { expiresIn : '1d'}//options
        );

        //add refresh token to DB
        await User.updateOne(validUser, {  refreshToken });
        
        res.cookie('jwt',refreshToken,{ httpOnly:true, maxAge : 24 * 60 * 60 * 1000 });
        res.json( {accessToken} );
    }
    else{
        res.sendStatus(401);
    }

}

module.exports = { handleLogin };