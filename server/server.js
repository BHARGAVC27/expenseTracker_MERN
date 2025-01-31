const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./database/db');
const budgetRoutes = require('./routes/budget');
const expenseRoutes = require('./routes/expense');
const incomeRoutes = require('./routes/income');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// Database connection
connectDb();

// Routes
app.use('/api', budgetRoutes);
app.use('/api', expenseRoutes);
app.use('/api', incomeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));