import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import CardInfo from './_components/CardInfo';
import CustomBarChart from './_components/CustomBarChart.jsx';
import BudgetItem from '@/components/_routes/budgets/_components/BudgetItem';
import axios from 'axios';
import exp from 'constants';

function Dashboard() {
  const { user } = useUser();

  const [budgets, setBudgets] = useState([]); // State to store the list of budgets
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchAllExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }

  const fetchIncomes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/incomes');
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/budgets/:id?');
      setBudgets(response.data); // Set fetched data to budgets state
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const chartData = budgets.map((budget) => {
    // Filter the expenses related to the current budget by matching `budget_id`
    const totalExpenses = expenses
      .filter((expense) => expense.budgetId === budget._id) // Match expenses with budget
      .reduce((sum, expense) => sum + expense.amount, 0); // Sum the expenses for this budget
  
    return {
      budgetName: budget.name,
      totalBudgetAmount: budget.amount,
      totalExpenses: totalExpenses,
    };
  });
  
  
  console.log("Chart Data:", chartData);
  

  useEffect(() => {
    fetchBudgets();
    fetchIncomes();
    fetchAllExpenses();
  }, []);


  return (
    <>
      <h2 className='font-bold text-2xl'>Hi,{user?.fullName} ✌️</h2>
      <p className='text-gray-500 pt-1'>Let's manage your Expense</p>
      <CardInfo budgets={budgets} incomes={incomes} expenses={expenses}/>
      <div className='md:col-span-2 w-full mt-5'>
        <CustomBarChart data={chartData}/>
      </div>

    </>

  )
}

export default Dashboard