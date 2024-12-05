const express = require('express');
const path = require('path');
const app = express();

app.set('json spaces', 0);

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Route untuk login (POST)
app.post('/player/growid/login/validate', (req, res) => {
  const data = req.query.data;
  
  if (data) {
    const decodedData = decodeURIComponent(data);
    const token = decodedData;

    res.json({
      status: 'success',
      message: 'Account Validated.',
      token: token,
      url: '',
      accountType: 'growtopia'
    });
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Data not provided'
    });
  }
});

// Route GET untuk meniru respons dari pro.gtps.pw
app.get('/player/growid/login/validate', (req, res) => {
  res.json({
    status: 'success',
    message: 'Account Validated.',
    token: '\ntankIDName|\ntankIDPass|\nklv|\nnull',
    url: '',
    accountType: 'growtopia'
  });
});

module.exports = app;
