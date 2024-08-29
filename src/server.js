require('dotenv').config();
const express = require('express');

const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const connection = require('./config/database');

const app = express();
const port=process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);
app.use('/' , webRouter);

app.listen(port, () => {
    console.log('Listening on post', port)
})