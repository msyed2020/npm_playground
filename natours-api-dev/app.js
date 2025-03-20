const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// app.get('/', (req, res) => { // Basic GET stuff
//     res.status(200).send('Server stuff');
// });

// app.post('/', (req, res) => {
//     res.send("POST");
// })

const tourFile = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => { // get
    res.status(200).json({
        status: 'success',
        results: tourFile.length,
        data: {
            tours: tourFile
        }
    });
});

app.post('api/v1/tours', (req, res) => { // post
    console.log(req.body);
    res.send("Post request received"); // receive post request
});

const port = 3000; // need to change port # later
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});