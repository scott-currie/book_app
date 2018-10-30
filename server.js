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

app.post('/searches', postResults);

app.listen(PORT,()  => console.log(`Listening on ${PORT}`));

function Book(query) {
  this.title = (query.title) ? query.title : "Title not found";
  this.author = (query.author) ? query.author: "Author not found";
  this.isbn = (query.isbn) ? query.isbn: "ISBN not found";
  this.image_url = (query.image_url) ? query.image_url: "Image not found";
  this.description = (query.description) ? query.description: "Description not found.";
}

function postResults(req, res) {
  const _URL = `https://www.googleapis.com/books/v1/volumes?q=${req.query.title}`;
  return superagent.get(_URL)
  .then((data) => {
    console.log(data);
    res.render('pages/searches/show', data);
  });
  // res.render(_URL);

}