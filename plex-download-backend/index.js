const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const https = require('https');
const app = express()
const port = 3000
const cors = require('cors')

var util = require('util'),
    exec = require('child_process').exec,
    child;

app.use(bodyParser.json())
app.use(cors())

app.get('/', function (req, res) {
    fs.writeFile('/Users/NateHochstetler/Downloads/test2.txt', 'test');
    res.send('test');
})

app.post('/save-torrent', function (req, res) {
    var body = req.body.body;
    var path = '/Users/NateHochstetler/Downloads/'
    // fs.writeFile('/Users/NateHochstetler/Downloads/test2.txt', 'test');
    child = exec('wget -O ' + path + body.filename + " " + body.url,
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    res.send('Successfully save');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))