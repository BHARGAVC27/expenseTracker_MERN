import { PiggyBank, CircleDollarSign, Coins } from 'lucide-react'
import React from 'react'

function CardInfo({ budgets, incomes, expenses }) {
  
    let totalbudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
    let totalIncome = incomes.reduce((acc,income) => acc + income.amount,0);
    let totalExpenses = expenses.reduce((acc,expense) => acc + expense.amount,0);

    return (
        <div>
            <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div className='flex justify-between p-7 border rounded-lg'>
                    <div>
                        <h2 className='text-sm'>Total Income</h2>
                        <h2 className='font-bold text-2xl'>${totalIncome}</h2>
                    </div>
                    <PiggyBank className='text-black bg-teal-100 rounded-full w-12 h-12 p-2' />
                </div>
                <div className='flex justify-between p-7 border rounded-lg'>
                    <div>
                        <h2 className='text-sm'>Total Budget</h2>
                        <h2 className='font-bold text-2xl'>${totalbudget}</h2>
                    </div>
                    <PiggyBank className='text-black bg-teal-100 rounded-full w-12 h-12 p-2' />
                </div>
                <div className='flex justify-between p-7 border rounded-lg'>
                    <div>
                        <h2 className='text-sm'>Total Spent</h2>
                        <h2 className='font-bold text-2xl'>${totalExpenses}</h2>
                    </div>
                    <CircleDollarSign className='text-black bg-teal-100 rounded-full w-12 h-12 p-2' />
                </div>
                <div className='flex justify-between p-7 border rounded-lg'>
                    <div>
                        <h2 className='text-sm'>No of Budgets</h2>
                        <h2 className='font-bold text-2xl'>{budgets.length}</h2>
                    </div>
                    <Coins className='text-black bg-teal-100 rounded-full w-12 h-12 p-2' size={50} />
                </div>
            </div>

        </div>
    )
}

export default CardInfo