import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BudgetItem({ budget }) {
  // Defensive check to prevent errors if budget is undefined or missing properties
  // console.log(budget._id);
  const amount = budget.amount || 0;
  const spent = budget.totalExpense || 0;
  const itemCount = budget.expensesCount || 0;

 console.log("Budget Item:", budget);

  return (
    <Link to={`/dashboard/expenses/${budget._id}`}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer transition-all">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-2 items-center bg-slate-100 rounded-full">
              {budget.emoji || '💰'}
            </h2>
            <div>
              <h2 className="font-semibold">{budget.name}</h2>
              <h2 className="text-gray-700 text-sm">{itemCount} Items</h2>
            </div>
          </div>
          <div>
            <h2 className="text-teal-700 font-bold">₹{amount}</h2>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-between">
            <h2 className="text-slate-500 font-medium text-xs">{spent} spent</h2>
            <h2 className="text-slate-500 font-medium text-xs">{amount - spent} remaining</h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className="h-2 bg-teal-700 rounded-full"
              style={{ width: `${(spent / amount) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
