import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateBudget from './CreateBudget';
import BudgetItem from './BudgetItem';
import { Toaster } from '@/components/ui/sonner';

function BudgetList() {
  const [budgets, setBudgets] = useState([]); // State to store the list of budgets
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(`${backendUrl}/budgets`);
      setBudgets(response.data); // Set fetched data to budgets state
    } catch (error) {
      console.error('Error fetching budgets:', error);
      <Toaster/>
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className='mt-5 sm:mt-7'>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        <CreateBudget onBudgetCreated={fetchBudgets} />
        {budgets.map((budget) => (
          <BudgetItem
            key={budget._id} budget={budget}
          />
        ))}
      </div>
    </div>
  );
}

export default BudgetList;
