var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send("__dirname = " + __dirname);
});

app.listen(3000, function() {
    console.log("__dirname = " + __dirname);
});