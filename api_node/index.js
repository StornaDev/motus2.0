const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')


const Tchat = require("./model/Tchat")

app.use(cors());

//Import Routes
const wordsRoute = require('./routes/words');
const authRoute = require('./routes/auth');
const userInfoRoute = require('./routes/infos');
const roomsRoute = require("./routes/rooms");
const tchatRoute = require("./routes/tchat")

dotenv.config();

// db connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    (err) => {
        if (!err) console.log("Mongodb connecté")
        else console.log("Connection error : " + err);
    });

//Middleware 
app.use(express.json());

//Route Middlewares
app.use('/api/words', wordsRoute);
app.use('/api/user', authRoute);
app.use('/api/infos', userInfoRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/tchat', tchatRoute);

io.on('connection', function (socket) {
    // console.log("Un utilisateur s'est connecté")
    socket.on('SEND_MESSAGE', function (data) {
        update = { "message": data.message, "user": data.user };
        const query = Tchat.findOne({ room_tchatId: data.room_tchatId });
        query.exec(function (err, obj) {
            console.log(obj)
            obj.messages.push(update)
            obj.save()
            io.sockets.emit('MESSAGE', obj)
        })

    });
});

server.listen(3000, () => console.log("Server up and running"));