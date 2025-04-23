const express = require('express');
const app = express();
const bookRoutes = require('./routes/book');

app.use(express.json());
app.use('/api/books', bookRoutes);

module.exports = app;