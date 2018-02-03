const protocol = require('http');

const hostname = '127.0.0.1';
const port = '8888';

const server = protocol.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({a: 'test'}));
});

server.listen(port, hostname, () => {
    console.log('Server up and runing at ' + hostname + ':' + port);
});