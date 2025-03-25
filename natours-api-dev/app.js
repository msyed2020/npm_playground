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

    const id = req.params.id * 1; // req.params.id is a string, * 1 converts it to int

    if (id > tourFile.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    const tour = tourFile.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        results: tourFile.length,
        data: {
            tour
        }
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

// app.patch updates data
app.patch('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id * 1;

    if (id > tourFile.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: 'updated'
        }
    });
});

// app.delete deletes data
app.delete('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id * 1;

    if (id > tourFile.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});