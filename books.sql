DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS
books (
  id SERIAL PRIMARY KEY NOT NULL,
  author VARCHAR(256) NOT NULL,
  title VARCHAR(256) NOT NULL,
  isbn VARCHAR(256) NOT NULL,
  image_url VARCHAR(256) NOT NULL,
  description VARCHAR(1024) NOT NULL,
  bookshelf VARCHAR(256) NOT NULL
);

INSERT INTO books VALUES(1, 'King, Stephen', 'The Gunslinger', 'ISBN', 'image', 'A sweet book', 'My bookshelf');