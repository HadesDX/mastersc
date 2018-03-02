const express = require('express');
const parser = require('body-parser');
const multiparty = require('multiparty');
const fs = require('fs');
const app = express();
const path = require('path');

var jparser = parser.json();
var urlencodedParser = parser.urlencoded({extended: false});

app.use(express.static('public'));
app.use(express.static('views'));

app.set("view engine", "ejs");

/*app.get('*', (req, res) => {
 res.render("page", {data: req.url});
 });*/
app.get('*', (req, res) => {
    res.render("bootstrap", {data: req.url});
});

app.post('/postdata', urlencodedParser, (req, res) => {
    if (!req.body) {
        return res.sendStatus(404);
    }
    res.render("postdata", {data: req.body});
});

app.post('/postdata2', (req, res) => {
    var form = new multiparty.Form();
    var data = {data: {}};

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
            data.data.err = err;
            res.render("postdata2", data);
            return;
        }

        //No valid file?
        if (!files['archivo'][0].originalFilename || files['archivo'][0].originalFilename === '') {
            fs.unlink(files['archivo'][0].path, (err) => {
                if (err) {
                    console.warn(err, ' File not deleted: ' + files['archivo'][0].path);
                }
                console.log('Temporal file ' + files['archivo'][0].path + ' was deleted');
            });
            data.data.noFile = 'No valid file';
            res.render("postdata2", data);
            return;
        }

        //Copy uploaded file
        var ext = /(\.[\w\d-]*)$/g.exec(files['archivo'][0].originalFilename);
        ext ? ext = ext[0] : ext = '';
        var filename = (new Date()).getTime();
        var fullfile = path.join(__dirname, 'public', 'archivos', filename + ext);
        var fullfileinfo = path.join(__dirname, 'public', 'archivos', filename + '.txt');
        fs.writeFileSync(fullfile, fs.readFileSync(files['archivo'][0].path));

        //Build up info file
        var info = '';
        for (var i in fields) {
            data.data[i] = fields[i];
            info += i + ' : ' + fields[i] + '\n';
        }
        fs.writeFileSync(fullfileinfo, info);

        //Prepare for view
        data.data.file = filename + ext;
        data.data.fileInfo = filename + '.txt';

        //Clean up ur dirty work
        fs.unlink(files['archivo'][0].path, (err) => {
            if (err) {
                console.warn(err, ' File not deleted: ' + files['archivo'][0].path);
            } else {
                console.log('Temporal file ' + files['archivo'][0].path + ' was deleted');
            }
        });

        res.render("postdata2", data);
    });
});

//app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname + '/index.html'));
//});
app.listen(8888, () => console.log('Listening on port 8888'));

