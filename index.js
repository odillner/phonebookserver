const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001

const routes = require('./routes');

//middleware
app.use(express.static('build'))
app.use(cors());
app.use(express.json()); //body
app.use(morgan('tiny')); //logger

routes(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})