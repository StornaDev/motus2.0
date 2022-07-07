const mongoose = require('mongoose');

const tchatSchema = new mongoose.Schema({
    room_tchatId: {
        type: String,
        required: true
    },
    messages: {
        type: Array,
        required: true
    },


});

module.exports = mongoose.model('Tchat', tchatSchema, "tchat")