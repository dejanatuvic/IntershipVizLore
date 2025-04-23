const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/booksdb');
        console.log('mongo povezan')
    } catch (error){
        console.error('Mongo nije povezan:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;