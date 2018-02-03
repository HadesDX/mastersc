const express = require('express');
const app = express();

app.use(express.static('public'));

//var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.listen(8888, () => console.log('Example app listening on port 8888'));