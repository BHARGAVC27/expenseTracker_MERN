import React from 'react';
import { Button } from '@/components/ui/button'; // Ensure Button is imported

function DummyPaymentPage({ onCompletePayment }) {
  return (
    <div className='p-10 bg-gradient-to-r from-teal-400 to-blue-500 min-h-screen flex flex-col items-center justify-center text-white'>
      <div className='bg-white text-black rounded-lg shadow-lg p-10 max-w-lg w-full'>
        <h1 className='text-4xl font-bold mb-4 text-center'>Dummy Payment Page</h1>
        <p className='text-gray-700 mb-6 text-center'>
          This is a dummy payment page. Click the button below to complete the payment.
        </p>
        <div className='text-center'>
          <Button className='bg-teal-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-800 transition duration-300' onClick={onCompletePayment}>
            Complete Payment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DummyPaymentPage;