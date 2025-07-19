import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function CustomBarChart({ data, title = "Activity" }) {
  
  // Check if this is summary data (has totalIncome/totalSpent) or detailed data
  const isSummaryChart = data.length > 0 && data[0].hasOwnProperty('totalIncome');
  
  return (
      <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>{title}</h2>
      <BarChart width={450} height={300} data={data} margin={{top:15,left:15,right:15}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        
        {/* Render bars based on chart type */}
        {!isSummaryChart && (
          <>
            {/* Budget bar in blue */}
            <Bar dataKey="budgetAmount" fill="#60a5fa" name="Budget Amount" />
            {/* Expense bar in red */}
            <Bar dataKey="expenseAmount" fill="#ef4444" name="Expense Amount" />
          </>
        )}
        
        {isSummaryChart && (
          <>
            {/* Total Income bar (for summary chart) */}
            <Bar dataKey="totalIncome" fill="#10b981" name="Total Income" />
            {/* Total Spent bar (for summary chart) */}
            <Bar dataKey="totalSpent" fill="#f59e0b" name="Total Spent" />
          </>
        )}
      </BarChart>
    </div>
  )
}

export default CustomBarChart