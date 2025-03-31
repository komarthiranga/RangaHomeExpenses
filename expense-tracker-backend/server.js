const express = require('express');  
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  
const cors = require('cors');  

// Initialize the app  
const app = express();  
const PORT = process.env.PORT || 8000;  

// Middleware  
app.use(cors());  
app.use(bodyParser.json());  

// MongoDB connection  
const CONNECTION_URL = 'mongodb://localhost:27017/expense_tracker'; 

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })  
    .then(() => console.log('MongoDB connected'))  
    .catch(err => console.error('MongoDB connection error:', err));  

// Expense Schema  
const expenseSchema = new mongoose.Schema({  
    date: { type: Date, required: true },  
    description: { type: String, required: true },  
    amount: { type: Number, required: true },  
});  

const Expense = mongoose.model('Expense', expenseSchema);  

// Routes  

// Create an expense  
app.post('/api/expenses', async (req, res) => {  
    const { date, description, amount } = req.body;  
    const newExpense = new Expense({ date, description, amount });  

    try {  
        const savedExpense = await newExpense.save();  
        res.status(201).json(savedExpense);  
    } catch (error) {  
        res.status(400).json({ message: error.message });  
    }  
});  

// Get all expenses  
app.get('/api/expenses', async (req, res) => {  
    const { startDate, endDate } = req.query;  

    try {  
        const filter = {};  
        if (startDate && endDate) {  
            filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };  
        }  
        const expenses = await Expense.find(filter);  
        res.status(200).json(expenses);  
    } catch (error) {  
        res.status(800).json({ message: error.message });  
    }  
});  

// Start the server  
app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});  