// This section is considered finished.


const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');


const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/starter/public`));

app.use((req, res, next) => {
    console.log("Middleware check");
    next(); // always use next function in middleware
});

// check for time
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString;
    next();
});

const tourFile = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tourFile.length,
        data: {
            tours: tourFile
        }
    });
};

const getTour = (req, res) => {

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
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
};

// old id-less get req

// app.get('/api/v1/tours', (req, res) => { 
//     res.status(200).json({
//         status: 'success',
//         results: tourFile.length,
//         data: {
//             tours: tourFile
//         }
//     });
// });

// new id-less get req lol

app.get('/api/v1/tours', getAllTours);

// new id get req

app.get('/api/v1/tours', getTour);

// old id get req

// app.get('/api/v1/tours/:id', (req, res) => {

//     const id = req.params.id * 1;

//     if (id > tourFile.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }

//     const tour = tourFile.find(el => el.id === id);

//     res.status(200).json({
//         status: 'success',
//         results: tourFile.length,
//         data: {
//             tour
//         }
//     });
// });

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

    res.status(204).json({ // 204 No Content
        status: 'success',
        data: null
    });
});



const userRouter = express.Router();

userRouter.param('id', (req, res, next, val) => { // val is parameter value
    console.log(`Tour id is: ${val}`);
    next();
});

userRouter.route('/').get(getAllUsers).post(createUser); // use the router variable for routing lol

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/users', userRouter);

//mongoose.connect();

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: Number,
    price: Number
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'Demo',
    price: 5.50,
    rating: 10
});

testTour.save();

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
