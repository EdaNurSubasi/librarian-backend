# LIBRARIAN BACKEND

This project is created to control actions that Librarian projects have. This is Librarian Backend. This projects contains database interactions that Librarian needs to have.

## How To Install Project

Project installation steps, explained down below.

> NOTE: Git and NPM must be installed on your system.

```
  $ git clone <git@github.com:EdaNurSubasi/librarian-backend.git> OR <https://github.com/EdaNurSubasi/librarian-backend.git>
  $ cd librarian-backend
  $ npm install --force
```
## How To Configure Database

```
  $ cd librarian-backend
  $ docker-compose up -d # This command creates and downloads postgresql. Then runs it. 
```

### Database Tables

Database table creation sql commands is given down below. You can use them to create essential tables for application.

	'CREATE TABLE users(id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, address VARCHAR(255) NULL, birthDate TIMESTAMP NULL, picture VARCHAR(255) NULL)'
	'CREATE TABLE books(id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, score FLOAT NULL, publishedDate TIMESTAMP NULL, writerName VARCHAR(255) NULL, picture VARCHAR(255) NULL)'
	'CREATE TABLE pastpresentdata(id SERIAL NOT NULL PRIMARY KEY, userId INT NOT NULL, bookId INT NOT NULL, userScore INT NULL, stillPresent BOOLEAN NULL, FOREIGN KEY (userId) REFERENCES users(id), FOREIGN KEY (bookId) REFERENCES books(id))'

## How To Configure Project

In the project folder, rename 'env' file to '.env'.

This file contain projects basic configurations.

-   SERVER_PORT: Port that application use for interactions from outside request and the port that application will work on.

-   HOST_URL: This is where the app returns an answer for the request to see that answer on web.

-   DB_USERNAME: Postgresql username information to connect.

-   DB_PASSWORD: Postgresql password information to connect.

-   DB: Postgresql database table information to connect.

-   DB_HOST: Postgresql host information to connect.

-   DB_PORT: Postgresql port information to connect.

## How To Run Project

In the project directory, you can run:

```
  $ npm run start
```

> NOTE: Project will start on

```
  http://localhost:3000/
```

> by default.
