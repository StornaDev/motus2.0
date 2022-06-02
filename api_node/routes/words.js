const router = require('express').Router();
const Word = require('../model/Word');


router.get('/',(req,res)=>{
    
    Word.findOne({length: req.body.letter}).then(function (words) {
        res.send(words);
    });
    
    // res.send(words)
       
    
})

module.exports = router;