const fs = require('fs');

const express = require('express');
const app = express();

const port = 3001;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})