// routes/budget.js
const express = require('express');
const router = express.Router();
const Budget = require('../models/userModel'); // Ensure the correct path
const Expense = require('../models/Expense')

// Route to create a new budget
router.post('/create-budget', async (req, res) => {
  const { name, amount } = req.body;
  console.log("Received data:", { name, amount });

  try {
    const newBudget = new Budget({ name, amount });
    await newBudget.save();
    console.log("Budget saved:", newBudget);
    res.status(201).json({ message: 'Budget created successfully' });
  } catch (error) {
    console.error("Error saving budget:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all budgets
router.get('/budgets/:id?', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get a single budget by ID
router.get('/budget/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findById(id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    res.status(200).json(budget);
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Update budget with expenses details
router.put('/budgets/:id', async (req, res) => {
  const { id } = req.params;
  const { totalExpense, expensesCount } = req.body;

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(id, {
      totalExpense,
      expensesCount
    }, { new: true });

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json(updatedBudget);
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete a budget
router.delete('/budgets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findById(id);
    const expense_count = budget.expensesCount;
    const deletedBudget = await Budget.findByIdAndDelete(id);

    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    //Deleting relevant expense
    const expenses = await Expense.deleteMany({ budgetId: id });

    if (expenses.deletedCount === expense_count) {
      console.log("All related expenses deleted successfully");
    } else {
      console.error("Error deleting related expenses");
      return res.status(404).json({ message: 'Error deleting expenses' });
    }

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;