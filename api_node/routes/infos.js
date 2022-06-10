const router = require('express').Router();

const User = require('../model/User');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');


function authentificateToken(req,res,next){
    
    const token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(401);        
    }

    jwt.verify(token,process.env.TOKEN_SECRET, (err, user)=>{
        if(err){
            return res.sendStatus(401);
        }
        req.user = user;
        next();
    });
}


router.get('/', authentificateToken,(req,res)=>{
    
    // const user = User.findOne({id: req.header('auth-token')});

    
    console.log(req.user);

    const user = User.findOne({id: req.user.id});
    if(user){
        User.findById(req.user._id).then((user) => {
            res.send(user)
        });
    }else{
        res.send("error")
    }
    
})

module.exports = router;