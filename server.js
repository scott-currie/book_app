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
  this.title = (query.volumeInfo.title) ? query.volumeInfo.title : "Title not found";
  this.author = (query.volumeInfo.authors[0]) ? query.volumeInfo.authors[0]: "Author not found";
  this.isbn = (query.isbn) ? query.isbn: "ISBN not found";
  this.image_url = (query.imageLinks.thumbnail) ? query.imageLinks.thumbnail: "Image not found";
  this.description = (query.searchInfo.textSnippet) ? query.searchInfo.textSnippet: "Description not found.";
}

function postResults(req, res) {
  const query = req.body['book-search'][0];
  const _URL = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  // console.log('_URL', _URL);
  return superagent.get(_URL)
  .then((data) => {
    // console.log(data.body.items[0].id);
    const books = data.body.items.map(book => new Book(book));
    res.render('pages/searches/show', {data: books});
  });
  // res.render(_URL);

}