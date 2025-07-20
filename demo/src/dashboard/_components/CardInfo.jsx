import { PiggyBank, CircleDollarSign, Coins } from 'lucide-react'
import React from 'react'

function CardInfo({ budgets, incomes, expenses }) {
  
    let totalbudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
    let totalIncome = incomes.reduce((acc,income) => acc + income.amount,0);
    let totalExpenses = expenses.reduce((acc,expense) => acc + expense.amount,0);

    return (
        <div className="space-y-4">
            {/* Cards Grid */}
            <div className='grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {/* Total Income Card */}
                <div className='bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex justify-between items-center'>
                        <div className="flex-1">
                            <h2 className='text-xs sm:text-sm text-gray-600 font-medium'>Total Income</h2>
                            <h2 className='font-bold text-lg sm:text-xl md:text-2xl text-green-600 mt-1'>₹{totalIncome.toLocaleString()}</h2>
                        </div>
                        <div className="ml-3">
                            <PiggyBank className='text-green-600 bg-green-100 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-2.5' />
                        </div>
                    </div>
                </div>

                {/* Total Budget Card */}
                <div className='bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex justify-between items-center'>
                        <div className="flex-1">
                            <h2 className='text-xs sm:text-sm text-gray-600 font-medium'>Total Budget</h2>
                            <h2 className='font-bold text-lg sm:text-xl md:text-2xl text-blue-600 mt-1'>₹{totalbudget.toLocaleString()}</h2>
                        </div>
                        <div className="ml-3">
                            <PiggyBank className='text-blue-600 bg-blue-100 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-2.5' />
                        </div>
                    </div>
                </div>

                {/* Total Spent Card */}
                <div className='bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex justify-between items-center'>
                        <div className="flex-1">
                            <h2 className='text-xs sm:text-sm text-gray-600 font-medium'>Total Spent</h2>
                            <h2 className='font-bold text-lg sm:text-xl md:text-2xl text-red-600 mt-1'>₹{totalExpenses.toLocaleString()}</h2>
                        </div>
                        <div className="ml-3">
                            <CircleDollarSign className='text-red-600 bg-red-100 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-2.5' />
                        </div>
                    </div>
                </div>

                {/* Number of Budgets Card */}
                <div className='bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex justify-between items-center'>
                        <div className="flex-1">
                            <h2 className='text-xs sm:text-sm text-gray-600 font-medium'>Active Budgets</h2>
                            <h2 className='font-bold text-lg sm:text-xl md:text-2xl text-purple-600 mt-1'>{budgets.length}</h2>
                        </div>
                        <div className="ml-3">
                            <Coins className='text-purple-600 bg-purple-100 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-2.5' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Health Indicator */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Financial Health</h3>
                        <p className="text-xs text-gray-600 mt-1">
                            {totalIncome > totalExpenses ? (
                                <span className="text-green-600">✓ You're saving money! Keep it up.</span>
                            ) : totalIncome === totalExpenses ? (
                                <span className="text-yellow-600">⚠ Breaking even. Consider reducing expenses.</span>
                            ) : (
                                <span className="text-red-600">⚠ Spending exceeds income. Review your budget.</span>
                            )}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-600">Balance</div>
                        <div className={`font-bold text-sm ${totalIncome >= totalExpenses ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{(totalIncome - totalExpenses).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardInfo