const fs = require('fs'); // fs stands for filesystem
const http = require('http'); // build webserver, include http

// File stuff (demo only, no longer needed, hence commented)

// Server stuff (actually needed lol)

const server = http.createServer((req, res) => {
    res.end("Server");
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
