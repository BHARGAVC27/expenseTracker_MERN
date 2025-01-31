import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Ensure Button is imported
import DummyPaymentPage from './DummyPaymentPage.jsx'; // Import DummyPaymentPage

function Upgrade() {
  const [showPricing, setShowPricing] = useState(false);
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const handleUpgrade = () => {
    setShowPricing(true);
  };

  const completeUpgrade = () => {
    // Simulate the upgrade process
    console.log('Upgrade Successful');
    setIsUpgraded(true);
    setShowPaymentPage(false);
  };

  const handlePayment = () => {
    setShowPaymentPage(true);
  };

  return (
    <div className='p-10 bg-gradient-to-r from-teal-400 to-blue-500 min-h-screen flex flex-col items-center justify-center text-white'>
      {showPaymentPage ? (
        <DummyPaymentPage onCompletePayment={completeUpgrade} />
      ) : (
        <div className='bg-white text-black rounded-lg shadow-lg p-10 max-w-lg w-full'>
          <h1 className='text-4xl font-bold mb-4 text-center'>Upgrade Your Account</h1>
          <p className='text-gray-700 mb-6 text-center'>
            Unlock premium features and take your experience to the next level by upgrading your account.
          </p>
          <ul className='list-disc list-inside mb-6'>
            <li className='mb-2'>Access to advanced analytics</li>
            <li className='mb-2'>Priority customer support</li>
            <li className='mb-2'>Unlimited budgets and expenses</li>
            <li className='mb-2'>Customizable reports</li>
            <li className='mb-2'>And much more...</li>
          </ul>
          {!showPricing ? (
            <div className='text-center'>
              <Button className='bg-teal-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-800 transition duration-300' onClick={handleUpgrade}>
                Upgrade Now
              </Button>
            </div>
          ) : (
            <div className='text-center'>
              <h2 className='text-2xl font-bold mb-4'>Pricing</h2>
              <p className='text-gray-700 mb-6'>Choose your plan and complete the upgrade process.</p>
              <Button className='bg-teal-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-800 transition duration-300' onClick={handlePayment}>
                Pay $9.99
              </Button>
            </div>
          )}
          {isUpgraded && (
            <div className='text-center mt-6'>
              <h2 className='text-2xl font-bold mb-4'>Upgrade Successful!</h2>
              <p className='text-gray-700'>Thank you for upgrading your account. Enjoy the premium features!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Upgrade;