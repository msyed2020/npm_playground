const fs = require('fs'); // fs stands for filesystem
const http = require('http'); // build webserver, include http
const url = require('url'); // Needed for routing

const replaceTemplate = (temp, prod) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, prod.productName); // //g means apply globally to all variables

    if (!prod.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
};

// To clarify on routing: setting up different behaviors for different URLs
const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const prodData = JSON.parse(data);

const server = http.createServer((req, res) => { // req url is page url, templates represent the actual url pages
    const path = req.url;

    // Home
    if (path === '/home' || path === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cards = prodData.map(el => replaceTemplate(card, el));

        res.end(overview);
    }
    // Projects
    else if (path === '/projects') {
        res.end("These are my projects!");
    }
    // API
    else if (path === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    }
    // Error Handle
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello'
        }); // This function forces 404 Error
        res.end("<h3>Page Not Found</h3>");
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
