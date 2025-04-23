const app = require('./app');
const connectDB = require('./config/db');

connectDB();

const port = 3001;
app.listen(port, () => {
    console.log(`running on ${port}`);
});