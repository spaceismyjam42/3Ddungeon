var express = require('express');
var app = express();
var path = require('path');
// view engine setup

var cons = require('consolidate');

/*
var port = process.env.PORT || CONFIG.port;
app.listen(port);
*/


app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
    res.render('dungeon');
    //res.send("__dirname = " + __dirname);
});


app.get('/', function(req,res){
    res.render('dungeon.css');
});



app.listen(5000);