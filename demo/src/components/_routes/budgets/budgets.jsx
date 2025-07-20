import React from 'react'
import DashboardLayout from '../../../layout'
import BudgetList from './_components/BudgetList'

function Budgets() {
  return (
    <div className='p-2 sm:p-3'>
      <h2 className='font-bold text-2xl sm:text-3xl'>My Budgets</h2>
      <BudgetList/>
    </div>
  )
}

export default Budgets