const express = require('express')
const path = require('path')
const logger = require('morgan')
require('dotenv').config()
const port = 3000;
const homeRoutes = require('./routes/home');

const app = express()

require('dotenv').config();
const api_key = process.env.TE_API_KEY;
const te = require('tradingeconomics');
te.login(api_key);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'))
app.use(express.json())

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});

app.use('/', homeRoutes);