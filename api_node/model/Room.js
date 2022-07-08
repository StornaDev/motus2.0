const mongoose = require('mongoose');

const Room = new mongoose.Schema({
    room_id: {
        type: Number,
        required: true,
    },
    room_code: {
        type: String,
        required: true,
    },
    room_word: {
        type: String,
    },
    room_tchatId: {
        type: String,
    },
    nbrLettre: {
        type: String
    },
    mode: {
        type: String
    }
});

module.exports = mongoose.model('Room', Room, "rooms")