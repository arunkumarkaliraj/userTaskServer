const express = require('express');
var cors = require("cors");

const app = express();
const routes = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use('/api', routes)
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})