const router = require('express').Router();
const Word = require('../model/Word');


router.post('/', (req, res) => {

    Word.find({ length: req.body.letter }).then(function (words) {
        res.send(words);
    });

});


router.post('/add', async (req, res) => {

    if (!(req.body.letter == "6" || req.body.letter == "7" || req.body.letter == "8")) return res.status(400).send("wrong word length")
    const word = new Word({
        word: req.body.word,
        length: req.body.letter,

    });

    if (Word.findOne({ word: word.word })) {
        console.log("mot déjà enregistré");
        return res.status(400).send("alr");
    }

    try {
        const savedWord = await word.save()
        res.send("word registered");
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }

});

router.post('/get_word', (req, res) => {
    const query = Word.findOne({ length: req.body.Length }); //Onécrit la requete qui trouve un mot dont la longueur est égale à celle recherchée

    Word.count({ length: req.body.Length }).exec(function (err, count) { //On compte tous les mots qui sont de la bonne longueur
        const random = Math.floor(Math.random() * count) //On génére un random entre 0 et le nombre de mots de la bonne longueur
        query.skip(random).exec(function (err, obj) { //On trouve un mot au hasard grâce à la requete
            if (err) { //S'il y a une erreur
                res.status(400).send(err)
            } else { //S'il n'y a pas d'erreur
                if (!obj) {
                    res.status(200).send() //S'il n'y a pas d'objet on renvoi un objet vide
                } else {
                    res.status(200).send(obj.word) // Sinon on renvoie le mot
                }
            }
        });
    })

})

router.delete("/delete", (req, res) => {
    Word.findOneAndDelete({ word: req.body.word.word })
        .then(function (words) {
            res.send(words.word + " deleted");
        });
});


module.exports = router;