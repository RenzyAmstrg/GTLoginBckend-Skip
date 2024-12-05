const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimiter = require('express-rate-limit');
const compression = require('compression');
const app = express();

// Apply compression middleware with custom options
app.use(compression({
    level: 5,
    threshold: 0,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Trust proxy settings
app.set('trust proxy', 1);

// Custom middleware for CORS and logging
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url} - ${res.statusCode}`);
    next();
});

// Apply body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Apply rate limiter middleware
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    headers: true
}));

app.set('json spaces', 0);
app.use(express.static(path.join(__dirname, '../')));

// Serve the main page
app.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Route untuk login (POST)
app.post('/player/growid/login/validate', (req, res) => {
    const { growId, password } = req.body;

    if (growId && password) {
        res.json({
            status: 'success',
            message: 'Account Validated.',
            token: `\n${growId}|\n${password}|\nklv|\nnull`,
            url: '',
            accountType: 'growtopia'
        });
    } else {
        res.status(400).json({
            status: 'error',
            message: 'GrowID and Password are required.'
        });
    }
});

// Route untuk login (GET)
app.get('/player/growid/login/validate', (req, res) => {
    res.set('Cache-Control', 'no-store');
    const data = req.query.data;

    if (data) {
        const decodedData = decodeURIComponent(data);
        res.json({
            status: 'success',
            message: 'Account Validated.',
            token: decodedData.replace(/\\n/g, '\n'),
            url: '',
            accountType: 'growtopia'
        });
    } else {
        res.json({
            status: 'success',
            message: 'Account Validated.',
            token: '\nundefined',
            url: '',
            accountType: 'growtopia'
        });
    }
});
module.exports = app;
