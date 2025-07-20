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
            {/* Desktop table header */}
            <div className='hidden sm:grid grid-cols-4 bg-slate-200 p-2 mt-3 rounded-t-md'>
                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>Date</h2>
                <h2 className='font-bold'>Action</h2>
            </div>
            <div>
                {expenses.map((expense) => (
                    <div key={expense.id} className='bg-slate-100 p-2 border-b last:rounded-b-md flex flex-col sm:grid sm:grid-cols-4 sm:items-center'>
                        {/* Mobile: name on top, amount+trash below. Desktop: table layout */}
                        <div className="flex flex-col w-full sm:block">
                            <div className="flex flex-row justify-between items-center sm:block">
                                <span className="font-medium text-base sm:text-inherit">{expense.name}</span>
                            </div>
                            {/* Mobile: amount + trash below name, Desktop: right side */}
                            <div className="flex flex-row items-center justify-between mt-1 sm:hidden">
                                <span className="text-teal-700 font-bold text-base">₹{expense.amount}</span>
                                <Trash className='text-red-600 cursor-pointer hover:bg-red-600 p-1 size-7 hover:rounded-full hover:text-white transition-all duration-300' onClick={() => deleteExpense(expense._id)} />
                            </div>
                        </div>
                        {/* Desktop: amount */}
                        <div className="hidden sm:block">₹{expense.amount}</div>
                        {/* Desktop: date */}
                        <div className="hidden sm:block">{new Date(expense.date).toLocaleDateString()}</div>
                        {/* Desktop: trash icon */}
                        <div className="hidden sm:flex items-center"><Trash className='text-red-600 cursor-pointer hover:bg-red-600 p-1 size-7 hover:rounded-full hover:text-white transition-all duration-300' onClick={() => deleteExpense(expense._id)} /></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExpenseList