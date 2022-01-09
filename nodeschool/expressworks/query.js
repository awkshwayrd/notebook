var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.set("view engine", "jade");
app.set("views", (path.join(__dirname, 'templates')));

app.use(express.static(path.join(__dirname, "public")));
app.use(require('stylus').middleware(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/home', function(req, res) {
    res.render('index', {date: new Date().toDateString()});
});
app.get('/search', function(req, res) {
    res.send(req.query);
});
app.post('/form', function(req, res) {
    res.end(req.body.str.split('').reverse().join(''));
});

app.put('/message/:id', function (req, res) {
    res.end(require('crypto').createHash('sha1').update(new Date().toDateString() + req.params.id).digest('hex'));
});
app.listen(process.argv[2] || 3000);