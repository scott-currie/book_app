'use strict';

// Dependecy variables
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const ejs = require('ejs');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// CRUD actions
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.post('/searches', postResults);


function Book(query) {
  this.title = (query.volumeInfo.title) ? query.volumeInfo.title : "Title not found";
  this.author = (query.volumeInfo.authors[0]) ? query.volumeInfo.authors[0]: "Author not found";
  this.isbn = (query.volumeInfo.industryIdentifiers[0].identifier) ? query.volumeInfo.industryIdentifiers[0].identifier: "ISBN not found";
  this.image_url = (query.volumeInfo.imageLinks.thumbnail) ? query.volumeInfo.imageLinks.thumbnail: "Image not found";
  this.description = (query.volumeInfo.description) ? query.volumeInfo.description: "Description not found.";
}

function postResults(req, res) {
  const query = req.body['book-search'][0];
  let _url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  
  return superagent.get(_url)
    .then((data) => {
      const books = data.body.items.map(book => new Book(book));
      res.render('pages/searches/show', {data: books});
  });
  
}
app.listen(PORT,()  => console.log(`Listening on ${PORT}`));