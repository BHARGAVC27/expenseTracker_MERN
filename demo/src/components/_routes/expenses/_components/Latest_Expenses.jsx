import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';

function Latest_Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteExpense = async (id) => {
    try {
      // Await the delete request directly
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      // Update the expenses state to remove the deleted expense
      setExpenses(expenses.filter((expense) => expense._id !== id));
      toast("Expense Deleted Succesfully");


    } catch (error) {
      console.error('Error deleting expense:', error);
      toast("Error deleting expense:")
    }
  };
  useEffect(() => {
    const fetchLatestExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses/');
        setExpenses(response.data || []);
      } catch (error) {
        console.error('Error fetching latest expenses:', error);
        toast.error('Failed to load latest expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestExpenses();
  }, []);


  if (loading) {
    return <div className="animate-pulse">Loading latest expenses...</div>;
  }

  if (!expenses.length) {
    return <div className="text-gray-500 mt-4">
      <Toaster/>
      <p>No expenses found.</p>
      Please add an expense in the Budgets to display here
      </div>;
  }

  return (
    <div className="p-4">
      <Toaster/>
      <h1 className="text-2xl font-bold mb-4">Latest Expenses</h1>
      <div className="space-y-4">
      
        {expenses.map((expense) => (
          <div
            key={expense._id}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border"
          >
            <div>
              <h3 className="font-medium">{expense.name}</h3>
              <p className="text-sm text-gray-500">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-5 text-teal-700 font-bold">
              ${expense.amount.toFixed(2)}
              <Trash className='text-red-600 cursor-pointer
               hover:bg-red-600 p-1 size-7 hover:rounded-full hover:text-white transition-all duration-300'
                onClick={() => { handleDeleteExpense(expense._id) }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Latest_Expenses;