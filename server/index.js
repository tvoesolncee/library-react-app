const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 9999;
const hostname = 'localhost';

let bookcase = [];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.get('/bookarr', async (request, response) => {
    bookcase = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(bookcase);
});

app.post('/bookarr', async (request, response) => {
    const bookArr = request.body;
    bookcase.push(bookArr);
    await writeData(bookcase);
    response.status(200).json({info: 'Book succefully created!'});
});

app.post('/bookarr/:bookArrId/book', async (request, response) => {
    const book = request.body;
    const bookArrId = Number(request.params.bookArrId);
    bookcase[bookArrId].books.push(book);
    await writeData(bookcase);
    response.status(200).json({info: 'Boook succefully created!'});
});

app.patch('/bookarr/:bookArrId/book/:bookId', async (request, response) => {
    const { newName, newAuthor } = request.body;
    const bookArrId = Number(request.params.bookArrId);
    const bookId = Number(request.params.bookId);

    bookcase[bookArrId].books[bookId].name = newName;
    bookcase[bookArrId].books[bookId].author = newAuthor;

    await writeData(bookcase);
    response.status(200).json({info: 'Book succefully changed!'});
});

app.delete('/bookarr/:bookArrId/book/:bookId', async (request, response) => {
    const bookArrId = Number(request.params.bookArrId);
    const bookId = Number(request.params.bookId);

    bookcase[bookArrId].books.splice(bookId, 1);

    await writeData(bookcase);
    response.status(200).json({info: 'Book succefully deleted!'});
});

app.patch('/bookarr/:bookArrId', async (request, response) => {
    const bookArrId = Number(request.params.bookArrId);
    const { bookId, destShelfId } = request.body;

    const bookToMove =  bookcase[bookArrId].books.splice(bookId, 1);
    bookcase[destShelfId].books.push(bookToMove);

    await writeData(bookcase);
    response.status(200).json({info: 'Book succefully moved!'});
});

app.listen(port, hostname, (error) => {
    if (error) {
        console.error(error);
    }
});
