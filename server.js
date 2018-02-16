const express = require('express');
const app = express();
//var path = require('path');

app.use(express.static('public'));
app.use(express.static('views'));

app.set("view engine", "ejs");

app.get('*', (req, response) => {
    response.render("page", {data: req.url});
});

//app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname + '/index.html'));
//});
app.listen(8888, () => console.log('Listening on port 8888'));

