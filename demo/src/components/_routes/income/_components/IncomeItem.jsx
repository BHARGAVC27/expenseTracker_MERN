import { Trash } from 'lucide-react';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import {toast} from 'sonner';
import axios from 'axios';

function IncomeItem({ income,fetchIncomes,length }) {
  const handleDeleteIncome = async(id) => {
    try{
      await axios.delete(`http://localhost:5000/api/incomes/${id}`);
      fetchIncomes();
      toast("Income Deleted Successfully");
    }catch(error){
      console.error('Error deleting income:', error);
      toast('Failed to delete income');
    }
  };

  return (
    <div className='p-5 border rounded-lg hover:shadow-md transition-all'>
        <Toaster/>
        <div className='flex gap-2 items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <h2 className='text-2xl p-2 items-center bg-slate-100 rounded-full'>💰</h2>
            <div>
              <h2 className='font-semibold'>{income.name}</h2>
              <h2 className='text-gray-700 text-sm'>{income.category}</h2>
            </div>
          </div>
          <div>
            <h2 className='text-teal-700 font-bold'>${income.amount}</h2>
          </div>
        </div>
        <div className='mt-5 flex justify-between'>
          <div className='flex justify-between'>
            <h2 className='text-slate-500 font-medium text-xs'>{new Date(income.date).toLocaleDateString()}</h2>
          </div>
          <div>
            <Trash className='text-red-500 cursor-pointer' onClick={()=>{handleDeleteIncome(income._id)}}/>
          </div>
        </div>
      </div>
  );
}

export default IncomeItem;