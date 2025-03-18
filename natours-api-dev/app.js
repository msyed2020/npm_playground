const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Server stuff');
});

app.post('/', (req, res) => {
    res.send("POST");
})

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});