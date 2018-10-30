'use strict';
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const ejs = require('ejs');
require('dotenv').config();
const PORT = process.env.PORT;



// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('err', err => console.log(err));

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Set routes
// app.get('/hello', function(req, res) {
//   res.render('pages/index');
// });

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.post('/', function(req, res) {
  res.send('POST request from form');
  console.log(req.body);
});

app.listen(PORT,()  => console.log(`Listening on ${PORT}`));

