import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import CardInfo from './_components/CardInfo';
import CustomBarChart from './_components/CustomBarChart.jsx';
import BudgetItem from '@/components/_routes/budgets/_components/BudgetItem';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
          <h2 className='font-bold text-xl sm:text-2xl md:text-3xl text-gray-800'>Hi, {user?.fullName} ✌️</h2>
          <p className='text-gray-600 mt-1 text-sm sm:text-base'>Let's manage your expenses and track your financial progress</p>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="mb-6 sm:mb-8">
        <CardInfo budgets={budgets} incomes={incomes} expenses={expenses}/>
      </div>
      
      {/* Charts Section */}
      <div className='space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6'>
        {/* Budget-wise detailed chart */}
        <div className='w-full'>
          <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-sm">
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Budget Overview</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Track your budget allocation and spending</p>
            </div>
            <div className="w-full h-64 sm:h-72 md:h-80">
              <CustomBarChart data={chartData} title="Budget vs Expenses vs Income"/>
            </div>
          </div>
        </div>
        
        {/* Total Income vs Total Spent summary chart */}
        <div className='w-full'>
          <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-sm">
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Financial Summary</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Overview of your total income vs expenses</p>
            </div>
            <div className="w-full h-64 sm:h-72 md:h-80">
              <CustomBarChart data={summaryData} title="Total Income vs Total Spent"/>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section - Only show on larger screens */}
      <div className="hidden lg:block mt-8">
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            
              <button className="p-4 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors">
                <Link to="/dashboard/budgets">
                <div className="text-teal-600 font-semibold">Add Budget</div>
                <div className="text-xs text-gray-600 mt-1">Create new budget</div>
                </Link>
              </button>
              <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                <Link to="/dashboard/incomes">
                  <div className="text-blue-600 font-semibold">Add Income</div>
                  <div className="text-xs text-gray-600 mt-1">Record new income</div>
                </Link>
              </button>
              <button className="p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                <Link to="/dashboard/budgets">
                  <div className="text-red-600 font-semibold">Add Expense</div>
                  <div className="text-xs text-gray-600 mt-1">Track new expense</div>
                </Link>
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard