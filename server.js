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
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect();
dbClient.on('err', err => console.log(err));

app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


// CRUD actions
app.get('/', getDBBooks);
app.get('/searches', getAPIResults);
app.post('/searches', postAPIResults);
app.get('/books/:id', getDBBook);


// Book object constructor
function Book(bookData) {
  // title and description are properties of both API and db results
  this.title = (bookData.title) ? bookData.title : "Title not found";
  this.description = (bookData.description) ? bookData.description: "Description not found.";
  if (!bookData.id) {   // If bookData has no id, it's an API result
    this.author = (bookData.authors[0]) ? bookData.authors[0]: "Author not found";
    this.isbn = (bookData.industryIdentifiers[0].identifier) ? bookData.industryIdentifiers[0].identifier: "ISBN not found";
    this.image_url = (bookData.imageLinks.thumbnail) ? bookData.imageLinks.thumbnail: "Image not found";
  }
  else {  // else do the db result specific stuff
    this.id = bookData.id;
    this.author = (bookData.author) ? bookData.author: "Author not found";
    this.isbn = (bookData.isbn) ? bookData.isbn: "ISBN not found";
    this.image_url = (bookData.image_url) ? bookData.image_url: "Image not found";
    this.bookshelf = bookData.bookshelf;
  }
}


// DB Functionality
function getDBBooks(req, res) {
  const SQL = 'SELECT * FROM books';

  dbClient.query(SQL)
  .then(result => {
    const books = (result.rows).map((book) => {
      return new Book(book);
    });
    res.render('./pages/index', {books: books});
  });
}

function getDBBook(req, res) {
  console.log('doing getTheBook');
  const SQL = `SELECT * FROM books WHERE id = $1;`;
  const values = [req.params.id];
  dbClient.query(SQL, values)
  .then(result => {
    res.render('pages/books/show', {book: new Book(result.rows[0])});
  })
  .catch((err) => res.render('pages/error.ejs', {err:err}));
}


//API
function getAPIResults(req, res) {
  res.render('pages/searches/new');
}

// Get data and post to show page
function postAPIResults(req, res) {
  // const query = req.body['book-search'][0];
  const searchTerm = req.body['book-search'][0];
  const query = (req.body['book-search'][1] === 'title') ? `+intitle:${searchTerm}` : `+inauthor:${searchTerm}`;
  let _url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

  return superagent.get(_url)
  .then((data) => {
    // console.log(data.body.items[0]);
    const books = data.body.items.map(apiBook => new Book(apiBook.volumeInfo));
    res.render('pages/searches/show', {books: books});
  })
  .catch((err) => res.render('pages/error.ejs', {err:err}));
}


app.listen(PORT,()  => console.log(`Listening on ${PORT}`));
