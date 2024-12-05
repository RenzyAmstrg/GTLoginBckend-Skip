const express = require('express');
const path = require('path');
const app = express();

app.set('json spaces', 0);

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route untuk login (GET)
app.get('/player/growid/login/validate', (req, res) => {
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
