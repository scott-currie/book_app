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
app.get('/', getBooks);
app.post('/searches', postResults);


// Book object constructor
function Book(query) {
  this.title = (query.volumeInfo.title) ? query.volumeInfo.title : "Title not found";
  this.author = (query.volumeInfo.authors[0]) ? query.volumeInfo.authors[0]: "Author not found";
  this.isbn = (query.volumeInfo.industryIdentifiers[0].identifier) ? query.volumeInfo.industryIdentifiers[0].identifier: "ISBN not found";
  this.image_url = (query.volumeInfo.imageLinks.thumbnail) ? query.volumeInfo.imageLinks.thumbnail: "Image not found";
  this.description = (query.volumeInfo.description) ? query.volumeInfo.description: "Description not found.";
}


function getBooks(req, res) {
  const SQL = 'SELECT * FROM books';
  
  dbClient.query(SQL)
  .then(result => {
    const books = (result.rows).map((book) => {
      return {
              author: book.author, 
              title: book.title, 
              isbn: book.isbn, 
              image_url: book.image_url, 
              description: book.description,
              bookshelf: book.bookshelf
            }
    });
    res.render('./pages/index', {books: books});
  });
}

// Fetch books from db
// function fetchBooks() {
//   const SQL = 'SELECT * FROM books';
  
//   dbClient.query(SQL)
//   .then(result => {
//     return (result.rows).map((book) => {
//       return {
//               author: book.author, 
//               title: book.title, 
//               isbn: book.isbn, 
//               image_url: book.image_url, 
//               description: book.description,
//               bookshelf: book.bookshelf
//             }
//     });
//   });

//   // Iterate over data to instantiate books

//   // Return an array of Book instances
// }

// Get data and post to show page
function postResults(req, res) {
  // const query = req.body['book-search'][0];
  const searchTerm = req.body['book-search'][0];
  const query = (req.body['book-search'][1] === 'title') ? `+intitle:${searchTerm}` : `+inauthor:${searchTerm}`;
  let _url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

  return superagent.get(_url)
  .then((data) => {
    console.log(data.body.items[0]);
    const books = data.body.items.map(book => new Book(book));
    res.render('pages/searches/show', {data: books});
  })
  .catch((err) => res.render('pages/error.ejs', {err:err}));
  // res.render(_URL);

}

app.listen(PORT,()  => console.log(`Listening on ${PORT}`));
