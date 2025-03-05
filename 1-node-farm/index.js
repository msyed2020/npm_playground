//const fs = require('fs'); // fs stands for filesystem
const http = require('http'); // build webserver, include http


const server = http.createServer((req, res) => {
    res.end("Server");
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
