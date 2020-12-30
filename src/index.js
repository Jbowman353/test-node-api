const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { getAds, insertAd } = require('./db/ads');
const { startDatabase } = require('./db/mongo');

// create the app
const app = express();

// Helmet enhances app security
app.use(helmet());

// Enable CORS
app.use(cors());

// Used to parse JSON bodies into JS
app.use(bodyParser.json());

// Morgan logs HTTP requests
app.use(morgan('combined'));

app.get('/', async (req, res) => {
    res.send(await getAds());
});

startDatabase().then(async () => {
    await insertAd({title: 'HELLO FROM THE DB!'});

    app.listen(3001, () => { console.log("LISTENING ON 3001") })
});
