import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

function ExpenseList({ budgetId, onDataChange }) {
    const [expenses, setExpenses] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const deleteExpense = async (id) => {
        try {
            // Await the delete request directly
            await axios.delete(`${backendUrl}/expenses/${id}`);
            toast("Expense Deleted Successfully")
            // Update the expenses state to remove the deleted expense
            setExpenses(expenses.filter((expense) => expense._id !== id));

            // Trigger data refresh in parent components
            if (onDataChange) {
                onDataChange();
            }

        } catch (error) {
            console.error('Error deleting expense:', error);
            toast("Error deleting expense")
        }
    };
    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${backendUrl}/expenses/budget/${budgetId}`);
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
                            <Trash className='text-red-600 cursor-pointer' onClick={() => deleteExpense(expense._id)} />
                        </h2>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default ExpenseList