const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/billstracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});

app.use(express.json());

const billSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    date: Date,
});

const Bill = mongoose.model('Bill', billSchema);

app.get('/api/bills', async (req, res) => {
    try {
        const bills = await Bill.find();
        res.json(bills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/bills', async (req, res) => {
    const bill = new Bill({
        title: req.body.title,
        amount: req.body.amount,
        date: req.body.date,
    });
    try {
        const newBill = await bill.save();
        res.status(201).json(newBill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
