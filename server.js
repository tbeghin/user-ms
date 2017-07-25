'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const userRoutes = require('./api/routes/user');
const authRoutes = require('./api/routes/authenticate');
const treeviewRoutes = require('./api/routes/treeview');
const iconListRoutes = require('./api/routes/icon-list');
const app = express();
const http = require('http');

app.use(function (req, res, next) {
    res.setHeader("api-version", require('./package.json').version);
    next();
});

// Authorize cross domain request
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());
app.use('/', express.static('site'));
app.use('/api', router);

userRoutes(router);
authRoutes(router);
treeviewRoutes(router);
iconListRoutes(router);

const port = 3061;
app.listen(port, function () {
    console.log(`Listening on port: ${port}`);
});

/**
 * Allow to catch uncaughtException Exception
 */
process.on('uncaughtException', function (error) {
    console.log(error);
    setTimeout(process.exit, 5000, 1);
});