const router = require('express').Router();
const Word = require('../model/Word');


router.post('/',(req,res)=>{
    
    Word.find({length : req.body.letter}).then(function (words) {
        res.send(words);
    });
     
});


router.post('/add',async (req,res)=>{

    if(!(req.body.letter =="6"|| req.body.letter =="7"|| req.body.letter =="8" )) return res.status(400).send("wrong word length")
    const word = new Word({
        word: req.body.word,
        length: req.body.letter,
        
    });
    try {
        const savedWord = await word.save()
        res.send("word registered");
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
       
});

router.delete("/delete", (req, res) => {
    console.log(req.body.word.word);
    Word.findOneAndDelete({word :req.body.word.word})
    .then(function (words) {
        res.send(words.word+" deleted");
    });
  });


module.exports = router;