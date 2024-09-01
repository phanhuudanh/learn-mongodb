require('dotenv').config();
const express = require('express');

const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const connection = require('./config/database');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const fileUpload = require('express-fileupload')

const app = express();
const port=process.env.PORT || 8888;

app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);
app.use('/' , webRouter);
app.use('/v1/api/', apiRouter);

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