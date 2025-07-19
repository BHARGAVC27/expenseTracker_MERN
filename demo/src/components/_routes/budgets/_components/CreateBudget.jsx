import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function CreateBudget({ onBudgetCreated }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Dialog open state

  const onCreateBudget = async () => {
    try {
      await axios.post('http://localhost:5000/api/create-budget', { name, amount });
      toast("Budget has been created.");
      setIsOpen(false); // Close the dialog
      onBudgetCreated(); // Trigger re-fetch of budgets in BudgetList
    } catch (error) {
      console.error('Error creating budget:', error);
      toast("Error creating budget.");
    }
  };

  return (
    <div>
      <Toaster/>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            className='flex flex-col bg-slate-100 p-10 rounded-md items-center border-2 border-dashed cursor-pointer hover:shadow-md'
            onClick={() => setIsOpen(true)}
          >
            <h2 className='text-3xl'>+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-2'>
                <h2 className='text-black font-medium my-2'>Budget Name</h2>
                <Input placeholder='e.g Home Decor' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='mt-2'>
                <h2 className='text-black font-medium my-2'>Budget Amount</h2>
                <Input type='number' placeholder='e.g. ₹1000' value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div>
                <Button
                  disabled={!(name && amount)}
                  onClick={onCreateBudget}
                  className='mt-3 w-full bg-teal-700'
                >
                  Create Budget
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
