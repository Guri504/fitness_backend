const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const routes = require("./routes")
const app = express();
require('dotenv').config();
const path = require('path');
const { verifyToken } = require("./middleware/authmiddleware");
const port = process.env.PORT;
const fileUpload = require('express-fileupload');


app.use(bodyParser.json({ limit: '200mb' }));
app.use(cors());

app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

Object.entries(routes).forEach(([key, route]) => {
    if (key.startsWith('/admin') || key.startsWith('/client')) {
        app.use(key, verifyToken, route)
    }
    else {
        app.use(route);
    }
});


app.listen(port, () => {
    console.log('Server running on port', port);
});