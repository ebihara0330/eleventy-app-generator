var express = require('express');
var path = require('path');
var getAuthorizations = require('./api/getAuthorizations');
var app = express();

app.use('/api', getAuthorizations);
app.use(express.static(path.join(__dirname, 'site')));

module.exports = app;