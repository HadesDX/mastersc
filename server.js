const express = require('express');
const parser = require('body-parser');
const app = express();
//var path = require('path');
var jparser = parser.json();
var urlencodedParser = parser.urlencoded({ extended: false });

app.use(express.static('public'));
app.use(express.static('views'));

app.set("view engine", "ejs");

app.get('*', (req, response) => {
    response.render("page", {data: req.url});
});

app.post('/postdata', urlencodedParser, (req, response) => {
    if (!req.body) {
        return response.sendStatus(404);
    }
    response.render("postdata", {data: req.body});
});

//app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname + '/index.html'));
//});
app.listen(8888, () => console.log('Listening on port 8888'));

