import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import React, { useEffect } from 'react'
import AddExpense from './_components/AddExpense';
import BudgetItem from '../budgets/_components/BudgetItem';
import ExpenseList from './_components/ExpenseList';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { element } from 'prop-types';


function ExpensesScreen() {
  const navigate = useNavigate();
  const { budget_id } = useParams();
  console.log(budget_id);
  const [budgets, setBudgets] = useState([]); // State to store the list of budgets
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(`${backendUrl}/budgets/${budget_id}`);
      setBudgets(response.data); // Set fetched data to budgets state
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const deleteBudget = async (id) => {
    try {
      await axios.delete(`${backendUrl}/budgets/${id}`);
      toast("Budget Deleted Successfully, Redirecting to Budgets Page...");
      setTimeout(() => {
        navigate('/dashboard/budgets');
      }, 1500);
    } catch (error) {
      console.error('Error deleting budget:', error);
      toast.error('Failed to delete budget');
    }
  };


  useEffect(() => {
    fetchBudgets();
  }, []);

  // Function to refresh budget data after expense operations
  const handleExpenseChange = () => {
    fetchBudgets();
  };

  return (
    <div className='p-3'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold mb-4'>My Expenses</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <span> {/* Wrapping in a non-button element */}
              <Button className='flex gap-2' variant='destructive'>
                <Trash />Delete
              </Button>
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteBudget(budget_id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgets.map((budget) =>
          budget_id === budget._id ? (
            <BudgetItem
              key={budget._id}
              budget={budget}
            />
          ) : null
        )}
        <AddExpense budgetId={budget_id} onExpenseAdded={handleExpenseChange} />
      </div>
      <div>
        <h2 className='font-bold text-2xl'>Latest Expenses</h2>
        <ExpenseList budgetId={budget_id} onDataChange={handleExpenseChange} />
      </div>
    </div>
  )
}

export default ExpensesScreen