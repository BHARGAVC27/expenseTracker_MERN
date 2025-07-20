import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Ensure Button is imported
import axios from 'axios';
import IncomeItem from '../income/_components/IncomeItem'; // Import IncomeItem
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/incomes`);
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const addIncome = async () => {
    try {
      const response = await axios.post(`${backendUrl}/incomes`, { name, amount, category });
      setIncomes([...incomes, response.data]);
      setName('');
      setAmount('');
      setCategory('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div className=''>
      <Outlet />
      <div className=''>
        <h1 className='text-3xl font-bold mb-4'>My Income</h1>

      </div>
      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div
              className='flex flex-col bg-slate-100 p-10 rounded-md items-center border-2 border-dashed cursor-pointer hover:shadow-md'>
              <h2 className='text-3xl'>+</h2>
              <h2>Enter New Income</h2>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Income</DialogTitle>
              <DialogDescription>
                <div className=''>
                  <h2 className='text-black font-medium my-2'>Income Name</h2>
                  <input
                    type='text'
                    placeholder='Income Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border p-2 rounded-lg w-full mb-2'
                  />
                  <h2 className='text-black font-medium my-2'>Income Amount</h2>
                  <input
                    type='number'
                    placeholder='Income Amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className='border p-2 rounded-lg w-full mb-2'
                  />
                  <Button disabled={!(name && amount)} className='bg-teal-700 w-full mt-3' onClick={addIncome}>
                    Add Income
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className='mt-4'>
        <h2 className='text-xl font-semibold mb-2'>Income List</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {incomes.map((income) => (
            <IncomeItem key={income._id} income={income} fetchIncomes={fetchIncomes} />
          ))}
          {!incomes.length
            && (
              <div className='text-center col-span-full'>
                <p className='text-gray-500'>No incomes</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Income;