import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import CardInfo from './_components/CardInfo';
import CustomBarChart from './_components/CustomBarChart.jsx';
import BudgetItem from '@/components/_routes/budgets/_components/BudgetItem';
import axios from 'axios';

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
    // Use the totalExpense field from the budget model instead of calculating
    const totalExpenses = budget.totalExpense || 0;
    
    // Calculate total income (you can modify this logic based on your needs)
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    return {
      name: budget.name,
      budgetAmount: budget.amount,
      expenseAmount: totalExpenses,
      incomeAmount: totalIncome, // Add total income to chart data
    };
  });

  // Create summary data for the second chart (Total Income vs Total Spent)
  const summaryData = [
    {
      name: "Financial Overview",
      totalIncome: incomes.reduce((sum, income) => sum + income.amount, 0),
      totalSpent: budgets.reduce((sum, budget) => sum + (budget.totalExpense || 0), 0),
    }
  ];

  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetchBudgets();
    fetchIncomes();
    fetchAllExpenses();
  }, []);

  // Function to refresh all data
  const refreshAllData = () => {
    fetchBudgets();
    fetchIncomes();
    fetchAllExpenses();
  };
  
  console.log("Chart Data:", chartData);


  return (
    <div>
      <h2 className='font-bold text-2xl'>Hi,{user?.fullName} ✌️</h2>
      <p className='text-gray-500 pt-1'>Let's manage your Expense</p>
      <CardInfo budgets={budgets} incomes={incomes} expenses={expenses}/>
      
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
        {/* Budget-wise detailed chart */}
        <div className='w-full'>
          <CustomBarChart data={chartData} title="Budget vs Expenses vs Income"/>
        </div>
        
        {/* Total Income vs Total Spent summary chart */}
        <div className='w-full'>
          <CustomBarChart data={summaryData} title="Total Income vs Total Spent"/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard