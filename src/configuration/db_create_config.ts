export const createUserTableDB: String =
	'CREATE TABLE users(id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, address VARCHAR(255) NULL, birthDate TIMESTAMP NULL, picture VARCHAR(255) NULL)'

export const createBookTableDB: String =
	'CREATE TABLE books(id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, score FLOAT NULL, publishedDate TIMESTAMP NULL, writerName VARCHAR(255) NULL, picture VARCHAR(255) NULL)'

export const createPastPresentTableDB: String =
	'CREATE TABLE pastPresent(id SERIAL NOT NULL PRIMARY KEY, userId INT NOT NULL, bookId INT NOT NULL, userScore INT NULL, stillPresent BOOLEAN NULL, FOREIGN KEY (userId) REFERENCES users(id), FOREIGN KEY (bookId) REFERENCES books(id))'
