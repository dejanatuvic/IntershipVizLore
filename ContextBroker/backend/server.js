const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./auth');
const uploadRoutes = require('./uploadData/uploadData');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo-users:27017/ContextBrokerUsers');

const upload = multer({ dest: 'uploads/' });

app.use('/auth', authRoutes);
app.post('/upload', upload.single('file'), uploadRoutes);

app.listen(5000, () => console.log('Server run on port 5000'));
