DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS
books (
  id SERIAL PRIMARY KEY,
  author VARCHAR(256) NOT NULL,
  title VARCHAR(256) NOT NULL,
  isbn VARCHAR(256) NOT NULL,
  image_url VARCHAR(256) NOT NULL,
  description VARCHAR(2048) NOT NULL,
  bookshelf VARCHAR(256) NOT NULL
);

INSERT INTO books (author, title, isbn, image_url, description, bookshelf) VALUES('Stephen King',
                            'The Gunslinger',
                            '9780451210845',
                            'http://books.google.com/books/content?id=X7ZJaea0P7cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
                            'Roland, the last gunslinger, tracks an enigmatic Man in Black toward a forbidding dark tower, fighting forces both mortal and other-worldly on his quest',
                            'Fantasy');

INSERT INTO books (author, title, isbn, image_url, description, bookshelf) VALUES('Stephen King',
                            'The Long Walk',
                            '150114426X',
                            'http://books.google.com/books/content?id=YpyMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
                            'A young boy has been selected to be one of 100 to take the Long Walk--a deadly contest of endurance and determination, in which each step could be his last.',
                            'Fantasy');

INSERT INTO books (author, title, isbn, image_url, description, bookshelf) VALUES('Neil Gaiman',
                            'American Gods',
                            '0380973650',
                            'http://books.google.com/books/content?id=Kasag4WdeM0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
                            'The storm was coming.... Shadow spent three years in prison, keeping his head down, doing his time. All he wanted was to get back to the loving arms of his wife and to stay out of trouble for the rest of his life. But days before his scheduled release, he learns that his wife has been killed in an accident, and his world becomes a colder place. On the plane ride home to the funeral, Shadow meets a grizzled man who calls himself Mr. Wednesday. A self-styled grifter and rogue, Wednesday offers Shadow a job. And Shadow, a man with nothing to lose, accepts. But working for the enigmatic Wednesday is not without its price, and Shadow soon learns that his role in Wednesday''s schemes will be far more dangerous than he ever could have imagined. Entangled in a world of secrets, he embarks on a wild road trip and encounters, among others, the murderous Czernobog, the impish Mr. Nancy, and the beautiful Easter -- all of whom seem to know more about Shadow than he himself does. Shadow will learn that the past does not die, that everyone, including his late wife, had secrets, and that the stakes are higher than anyone could have imagined. All around them a storm of epic proportions threatens to break. Soon Shadow and Wednesday will be swept up into a conflict as old as humanity itself. For beneath the placid surface of everyday life a war is being fought -- and the prize is the very soul of America. As unsettling as it is exhilarating, American Gods is a dark and kaleidoscopic journey deep into myth and across an America at once eerily familiar and utterly alien. Magnificently told, this work of literary magic will haunt the reader far beyond the final page.',
                            'Fantasy');