const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;
const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = 'UsersDB';

app.use(express.json());

let db;
MongoClient.connect(url)
    .then(client => {
        db = client.db(dbName);
        console.log('Povezano');
        app.listen(port, () => console.log(`Radi na http://localhost:${port}`));
    })
    .catch(error => console.error(error));

    app.get('/users', async (req, res) => {
        const users = await db.collection('users').find().toArray();
        res.json(users);
    });

    app.post('/users', async (req, res) => {
        const user = await db.collection("users").insertOne(req.body);
        res.json(user);
    });

    app.put('/users/:_id', async (req, res) => {
        const _id = req.params._id;
        const rez = await db.collection("users").updateOne(
            {_id: new ObjectId(_id)},
            {$set: req.body}
        );
        res.json(rez);
    });

    app.delete('/users/:_id', async (req, res) => {
        const _id = req.params._id;
        const rez = await db.collection("users").deleteOne({ _id: new ObjectId(_id) });
        res.json(rez);
    });