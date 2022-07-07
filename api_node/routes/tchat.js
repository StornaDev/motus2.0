const Tchat = require("../model/Tchat")
const router = require('express').Router();


router.post('/get_messages', (req, res) => {

    Tchat.findOne({ room_tchatId: req.body.room_tchatId }).then(function (response) {
        res.send(response);
    });

});

module.exports = router;