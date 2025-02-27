import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Image from "../Images/FailureImage.webp"; 

const PaymentFailure = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');  
  }, 5000);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      {/* <img src={Image} alt="payment-failure" className="h-1/3 mb-6" /> */}
      <div className="text-2xl font-bold text-red-600">Payment Failed</div>
      <div className="text-lg mt-4 text-gray-600">Oops! Something went wrong during the payment process.</div>
      <div className="mt-6 text-lg text-gray-500">Redirecting to homepage...</div>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        Retry Payment
      </button>
    </div>
  );
};

export default PaymentFailure;
