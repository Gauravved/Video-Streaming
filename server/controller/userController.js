const bcrypt = require("bcrypt");
const User = require("../models/userModel").userSchema;
module.exports.register = async (req,res,next)=>{
    try{
        const {channelName, email, password} = req.body;
        const isChannel = await User.findOne({channelName});
        if(isChannel){
            return res.json({status: false, msg: "This channel already exist"});
        }
        const isEmail = await User.findOne({email});
        if(isEmail){
            return res.json({status: false, msg: "This email i already registered"});
        }
        const encryptedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            channelName,
            email,
            password: encryptedPassword 
        });
        delete user.password;
        res.json({status: true, user});

    }catch(exception){
        next();
    }
}
module.exports.login = async (req,res,next)=>{
    try{
        const {email, password} = req.body;
        const isEmail = await User.findOne({email});
        if(!isEmail){
            return res.json({status: false, msg: "Email is not registered"});
        }
        const isPassword = await bcrypt.compare(password, isEmail.password);
        if(!isPassword){
            return res.json({status: false, msg: "Incorrect Password"});
        }
        return res.json({status: true, user: isEmail})
    }catch(exception){
        next();
    }
}