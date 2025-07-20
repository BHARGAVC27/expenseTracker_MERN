import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function CustomBarChart({ data, title = "Activity" }) {
  
  // Check if this is summary data (has totalIncome/totalSpent) or detailed data
  const isSummaryChart = data.length > 0 && data[0].hasOwnProperty('totalIncome');
  
  // Custom tooltip for better mobile display
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 sm:p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="text-xs sm:text-sm font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs sm:text-sm" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className='w-full h-full'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis 
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            iconType="rect"
          />
          
          {/* Render bars based on chart type */}
          {!isSummaryChart && (
            <>
              {/* Budget bar in blue */}
              <Bar 
                dataKey="budgetAmount" 
                fill="#3b82f6" 
                name="Budget Amount"
                radius={[2, 2, 0, 0]}
              />
              {/* Expense bar in red */}
              <Bar 
                dataKey="expenseAmount" 
                fill="#ef4444" 
                name="Expense Amount"
                radius={[2, 2, 0, 0]}
              />
            </>
          )}
          
          {isSummaryChart && (
            <>
              {/* Total Income bar (for summary chart) */}
              <Bar 
                dataKey="totalIncome" 
                fill="#10b981" 
                name="Total Income"
                radius={[2, 2, 0, 0]}
              />
              {/* Total Spent bar (for summary chart) */}
              <Bar 
                dataKey="totalSpent" 
                fill="#f59e0b" 
                name="Total Spent"
                radius={[2, 2, 0, 0]}
              />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart