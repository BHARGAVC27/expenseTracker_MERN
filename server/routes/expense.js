const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Route to create a new expense
router.post('/expenses/create-expense', async (req, res) => {
  const { name, amount, budgetId } = req.body;

  try {
    const newExpense = new Expense({ name, amount, budgetId });
    await newExpense.save();
    res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().populate('budgetId');
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get expenses for a specific budget
router.get('/expenses/budget/:budgetId', async (req, res) => {
  const { budgetId } = req.params;

  try {
    const expenses = await Expense.find({ budgetId });
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses for budget:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get a single expense by ID
router.get('/expenses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id).populate('budgetId');
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete an expense by ID
router.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // First, get the expense to find its budgetId and amount
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    const { budgetId, amount } = expense;

    // Delete the expense
    await Expense.findByIdAndDelete(id);

    // Update the budget's totalExpense and expensesCount
    const Budget = require('../models/userModel');
    const budget = await Budget.findById(budgetId);
    if (budget) {
      const newTotalExpense = Math.max(0, (budget.totalExpense || 0) - amount);
      const newExpensesCount = Math.max(0, (budget.expensesCount || 0) - 1);

      await Budget.findByIdAndUpdate(budgetId, {
        totalExpense: newTotalExpense,
        expensesCount: newExpensesCount,
      });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
