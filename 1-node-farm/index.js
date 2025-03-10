//const fs = require('fs'); // fs stands for filesystem
const http = require('http'); // build webserver, include http
const url = require('url'); // Needed for routing

// machine time coming lol

// To clarify on routing: setting up different behaviors for different URLs

const server = http.createServer((req, res) => {
    const path = req.url;

    if (path === '/home' || path === '/') {
        res.end("Home page");
    }
    else if (path === '/projects') {
        res.end("These are my projects!");
    }
    else {
        res.writeHead(404); // This function forces 404 Error
        res.end("Page Not Found");
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
