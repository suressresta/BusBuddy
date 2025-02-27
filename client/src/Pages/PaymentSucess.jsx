import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Image from "../Images/Payment.webp";

const PaymentSuccess = () => {
  const [search] = useSearchParams();
  const dataQuery = search.get("data");
  const [data, setData] = useState({});
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const resData = atob(dataQuery);
    const resObject = JSON.parse(resData);
    setData(resObject);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
        }
        return prev + 20;
      });
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearInterval(interval);
  }, [dataQuery, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={Image} alt="payment" className="h-1/2" />
      <div className="text-2xl font-bold">Rs.{data.total_amount}</div>
      <div className="text-2xl font-bold">Payment Successful</div>
      <div className="text-lg mt-4">Redirecting to the homepage...</div>

      <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-2/6 rounded-full mt-6 overflow-hidden">
        <div
          className="bg-green-500 text-center font-bold py-0.5 rounded-full"
          style={{
            width: `${progress}%`,
            transition: "width 1s ease-in-out",
            height: "8px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

// http://localhost:3000/payment-sucess?data=eyJ0cmFuc2FjdGlvbl9jb2RlIjoiMDAwOVYwVSIsInN0YXR1cyI6IkNPTVBMRVRFIiwidG90YWxfYW1vdW50IjoiMjUwLjAiLCJ0cmFuc2FjdGlvbl91dWlkIjoiNjdiZmUwNjU4ZDIxZmNiNjhiMmZhYTliIiwicHJvZHVjdF9jb2RlIjoiRVBBWVRFU1QiLCJzaWduZWRfZmllbGRfbmFtZXMiOiJ0cmFuc2FjdGlvbl9jb2RlLHN0YXR1cyx0b3RhbF9hbW91bnQsdHJhbnNhY3Rpb25fdXVpZCxwcm9kdWN0X2NvZGUsc2lnbmVkX2ZpZWxkX25hbWVzIiwic2lnbmF0dXJlIjoiYTgrRitjY1ZnN2J2Qnd0Q0NBYnB5SWJ3bnBpajlPQ29GajBlM2FCUTFDWT0ifQ==
