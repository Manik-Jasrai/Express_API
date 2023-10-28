

//1.Input request=>check for duplicacy
//2.Encrypt
//3.add back to DB
const User = require('../model/User');
const bcrypt = require('bcrypt');


const handleNewUser = async (req,res)=>{
    //input of user
    const { user , pwd } = req.body;
    //checking of valid input
    if(!(user && pwd)) return res.status(400).json({'message':`User and password required`});
    //check for duplicacy
    const duplicate = await User.findOne( { username : user } ).exec();
    if(duplicate) return res.sendStatus(409);
    try{
        //hash the pwd
        const hashedPwd = await bcrypt.hash(pwd,10);
        //enter back to the DB

        const result = await User.create({
            "username" : user,
            "password" : hashedPwd
        });
        console.log(result);
        res.status(201).json({'message' : `new user ${user} created`});
    }
    catch (err){
        res.status(500).json({'message':err.message});
    }

}
module.exports = { handleNewUser };
