const router = require('express').Router();
const Room = require('../model/Room');

router.post('/add', (req, res) => {
    Room.count().exec(async function (err, count) { //On compte tous les mots qui sont de la bonne longueur
        const room = new Room({
            room_id: count,
            room_code: req.body.room_code,
        });
        try {
            const savedRoom = await room.save()
            console.log(room)
            res.status(200).send(room)
        } catch (error) {
            res.status(400).send(error);
            console.log(error);
        }
    })


})

module.exports = router;