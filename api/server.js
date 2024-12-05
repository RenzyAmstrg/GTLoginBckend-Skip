const express = require('express');
const path = require('path');
const app = express();

app.set('json spaces', 0);

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Route untuk login (GET)
app.get('/player/growid/login/validate', (req, res) => {
  const data = req.query.data;

  if (data) {
    const decodedData = decodeURIComponent(data);
    res.json({
      status: 'success',
      message: 'Account Validated.',
      token: decodedData,
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
