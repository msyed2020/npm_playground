const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const tourFile = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => { 
    res.status(200).json({
        status: 'success',
        results: tourFile.length,
        data: {
            tours: tourFile
        }
    });
});

app.get('/api/v1/tours/:id', (req, res) => { 
    console.log(req.params);
    res.status(200).json({
        status: 'success',
        // results: tourFile.length,
        // data: {
        //     tours: tourFile
        // }
    });
});

app.post('/api/v1/tours', (req, res) => { 
    const newID = tourFile[tourFile.length - 1].id + 1;
    const newTour = Object.assign({ id: newID }, req.body);

    tourFile.push(newTour);
    fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tourFile), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });

});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});