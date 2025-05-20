const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./auth');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ContextBrokerUsers', { useNewUrlParser: true, useUnifiedTopology: true });


app.use('/auth', authRoutes);

app.listen(5000, () => console.log('Server run on port 5000'));
