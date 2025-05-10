import express from "express";
import mongoose from "mongoose";
import Cards from './dbCards.js';
import cors from 'cors';

//App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:qW8GXUM11ibjlUeS@cluster0.ewlpmbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // React app origin
    credentials: true
}));

//DB Config
mongoose.connect(connection_url);


// API Endpoints
// GET route
app.get('/tinder/cards', async (req, res) => {
    try {
        const data = await Cards.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST route
app.post('/tinder/cards', async (req, res) => {
    try {
        const dbCard = req.body;
        const data = await Cards.create(dbCard);
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// app.get('/tinder/cards', (req, res) => {
//     Cards.find()
//         .then(data => {
//             res.status(200).send(data);
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// });


//Listener

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
