const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors());

//Import Routes
const wordsRoute = require('./routes/words');
const authRoute = require('./routes/auth');
const userInfoRoute = require('./routes/infos');
const roomsRoute = require("./routes/rooms");
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

app.listen(3000, () => console.log("Server up and running"));