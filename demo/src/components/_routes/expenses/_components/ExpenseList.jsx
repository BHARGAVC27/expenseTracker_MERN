import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

function ExpenseList({budgetId}) {
    const  [expenses, setExpenses] = useState([]);
    
    const deleteExpense = async (id) => {
        try {
            // Await the delete request directly
            await axios.delete(`http://localhost:5000/api/expenses/${id}`);
            toast("Expense Deleted Succesdfully")
            // Update the expenses state to remove the deleted expense
            setExpenses(expenses.filter((expense) => expense._id !== id));
            
           
        } catch (error) {
            console.error('Error deleting expense:', error);
            toast("Expense Deleted Succesdfully")
        }
    };
    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/expenses/budget/${budgetId}`);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }

    useEffect(() => {
        fetchExpenses();
    })

  return (
    <div>
        <div className='grid grid-cols-4 bg-slate-200 p-2 mt-3'>
            <h2 className='font-bold'>Name</h2>
            <h2 className='font-bold'>Amount</h2>
            <h2 className='font-bold'>Date</h2>
            <h2 className='font-bold'>Action</h2>
        </div>
        <div >
            {expenses.map((expense) => (
                <div key={expense.id} className='grid grid-cols-4 bg-slate-100 p-2'>
                    <h2>{expense.name}</h2>
                    <h2>{expense.amount}</h2>
                    <h2>{new Date(expense.date).toLocaleDateString()}</h2>
                    <h2>
                        <Trash className='text-red-600 cursor-pointer' onClick={() => deleteExpense(expense._id)}/>
                    </h2>
                </div>
            ))}
            
        </div>

    </div>
  )
}

export default ExpenseList