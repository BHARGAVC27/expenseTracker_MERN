import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

function AddExpense({ budgetId, onExpenseAdded }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleAddExpense = async () => {
    if (!budgetId) {
      console.log("Error");
      return;
    }
    console.log("Budget ID:", budgetId);
    setLoading(true);
    try {
      // Fetch current budget
      const budgetRes = await axios.get(`${backendUrl}/budgets/${budgetId}`);
      const budget = budgetRes.data;
      const newExpensesCount = Number(budget[0].expensesCount) + 1;
      const newTotalExpense = Number(budget[0].totalExpense) + Number(amount);

      if (newTotalExpense <= budget[0].amount) {
        await axios.post(`${backendUrl}/expenses/create-expense`, {
          budgetId,
          name,
          amount: Number(amount),
        });

        await axios.put(`${backendUrl}/budgets/${budgetId}`, {
          totalExpense: newTotalExpense,
          expensesCount: newExpensesCount,
        });

        console.log("Budget updated successfully");
        toast('Expense added successfully');
        if (onExpenseAdded) onExpenseAdded();
        setName('');
        setAmount('');
      } else {
        console.log(newTotalExpense, budget[0].amount);
        toast.error('Expense exceeds budget limit');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='border p-5 rounded-lg'>
      <Toaster />
      <h2 className='font-bold text-lg'>Add Expense</h2>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Name</h2>
        <Input
          value={name}
          placeholder="e.g Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <h2 className='text-black font-medium my-1'>Expense Amount</h2>
        <Input
          value={amount}
          placeholder="e.g 1000"
          type='number'
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
        <Button
          disabled={!(name && amount) || loading}
          className='mt-2 w-full'
          onClick={handleAddExpense}
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </Button>
      </div>
    </div>
  );
}

export default AddExpense;