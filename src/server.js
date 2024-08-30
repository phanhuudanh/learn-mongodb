require('dotenv').config();
const express = require('express');

const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const connection = require('./config/database');
const mongoose = require('mongoose');

const app = express();
const port=process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);
app.use('/' , webRouter);


(async() => {
    try {
        await connection();
        console.log('Backend listening on port', port)
    } catch (error) {
        console.log('error connect to db:', error)
    }
})();

app.listen(port, () => {
    console.log('Listening on port', port)
})