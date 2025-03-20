const express = require('express');
const fs = require('fs');
const app = express();

// app.get('/', (req, res) => { // Basic GET stuff
//     res.status(200).send('Server stuff');
// });

// app.post('/', (req, res) => {
//     res.send("POST");
// })

const tourFile = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);

app.get('/api/v1/tours', (req, res) => {

});

const port = 3000; // need to change port # later
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});