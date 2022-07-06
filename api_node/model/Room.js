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
});

module.exports = mongoose.model('Room', Room)