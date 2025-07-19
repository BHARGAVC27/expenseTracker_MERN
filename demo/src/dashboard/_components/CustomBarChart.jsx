import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function CustomBarChart({ data }) {
  
  return (
      <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Activity</h2>
      <BarChart width={900} height={300} data={data} margin={{top:15,left:15,right:15}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Budget bar as background */}
        <Bar dataKey="budgetAmount" stackId="a" fill="#60a5fa" barSize={40} />
        {/* Expense bar overlays on top, in green */}
        <Bar dataKey="expenseAmount" stackId="a" fill="#22c55e" barSize={25} />
      </BarChart>
    </div>
  )
}

export default CustomBarChart