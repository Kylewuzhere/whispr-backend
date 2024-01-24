CREATE DATABASE social_media;

CREATE TABLE users
(
  id INT IDENTITY(1, 1) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL,
  google_id VARCHAR(255)
);

CREATE TABLE posts
(
  id INT IDENTITY(1, 1) PRIMARY KEY,
  body VARCHAR(255) NOT NULL,
  author_id INT references users(id) NOT NULL
);

