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
        <Bar dataKey="budgetAmount" stackId="a" fill="#8884d8" />
        <Bar dataKey="expenseAmount" stackId="b" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}

export default CustomBarChart