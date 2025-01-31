const express = require('express');
const router = express.Router();
const Income = require('../models/Income');

// Route to get all incomes
router.get('/incomes', async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add a new income
router.post('/incomes', async (req, res) => {
  const { name, amount } = req.body;

  try {
    const newIncome = new Income({ name, amount });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

//Route to delete an income
router.delete('/incomes/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const deletedIncome = await Income.findByIdAndDelete(id);
    if (!deletedIncome) return res.status(404).json({ message: 'Income not found' });
    res.status(200).json({ message: 'Income deleted successfully' });
  }catch(error){
    res.status(500).json({message: 'Server error'});
  }
});

module.exports = router;