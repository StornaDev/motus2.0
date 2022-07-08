const router = require('express').Router();
const Room = require('../model/Room');
const Tchat = require("../model/Tchat")
router.post('/add', (req, res) => {
    Room.count().exec(async function (err, count) { //On compte toutes les rooms pour connaître l'id de la prochaine room
        const room = new Room({
            room_id: count,
            room_code: req.body.room_code,
            room_tchatId: req.body.room_code,
            nbrLettre: req.body.nbrLettre,
            mode: req.body.mode
        });
        const tchat = new Tchat({
            room_tchatId: req.body.room_code,
            messages: []
        })
        try {
            const savedRoom = await room.save()
            const savedTchat = await tchat.save()
            console.log(room)
            res.status(200).send({
                "room": room,
                "tchat": tchat,
            })
        } catch (error) {
            res.status(400).send(error);
            console.log(error);
        }
    })
})

router.post('/get_room', (req, res) => {
    console.log("test")
    Room.findOne({ room_code: req.body.room_code }).then(function (response) {
        res.send(response);
    });
})

module.exports = router;