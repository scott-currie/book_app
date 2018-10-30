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
  this.isbn = (query.volumeInfo.industryIdentifiers[0].identifier) ? query.volumeInfo.industryIdentifiers[0].identifier: "ISBN not found";
  this.image_url = (query.volumeInfo.imageLinks.thumbnail) ? query.volumeInfo.imageLinks.thumbnail: "Image not found";
  this.description = (query.volumeInfo.description) ? query.volumeInfo.description: "Description not found.";
}

function postResults(req, res) {
  console.log('req.body', req.body);
  const query = req.body['book-search'][0];
  let _url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

  // _url = (req.body['book-search'][1] === 'author') ?  '' : _url;


  // console.log('_URL', _URL);
  return superagent.get(_url)
  .then((data) => {
    console.log(data.body.items[0]);
    const books = data.body.items.map(book => new Book(book));
    res.render('pages/searches/show', {data: books});
  });
  // res.render(_URL);

}