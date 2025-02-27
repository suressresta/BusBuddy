import React from "react";
import { useNavigate } from "react-router-dom";
import { success } from "../Utils/notification";

const Payment = ({ data }) => {
  // const navigate = useNavigate();
  const secretKey = "8gBm/:&EnhH.1/q";

  return (
    <div className="mt-24 flex justify-center items-center   text-white ">
      <div className='w-8/12 p-6 rounded-2xl  bg-gray-900 bg-opacity-90'>
        <b>eSewa ID:</b> 9806800001/2/3/4/5 <br />
        <b>Password:</b> Nepal@123 <br />
        <b>MPIN:</b> 1122 <b>Token:</b> 123456
        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
          // target="_blank"
          className="mt-4 text-start font-semibold flex flex-col justify-center items-center "
        >
          <input
            type="hidden"
            id="amount"
            name="amount"
            value={data.order.totalAmount}
            // onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="hidden"
            id="tax_amount"
            name="tax_amount"
            value="0"
            className="border p-2 w-full rounded "
            required
          />

          <div className=" w-full">Total Amount</div>
          <input
            type="text"
            id="total_amount"
            name="total_amount"
            value={data.order.totalAmount}
            className="border p-2 w-full rounded text-black"
            required
          />

          <input
            type="hidden"
            id="transaction_uuid"
            name="transaction_uuid"
            value={data.order._id}
            // onChange={(e) => setTransactionUuid(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="hidden"
            id="product_code"
            name="product_code"
            value="EPAYTEST"
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="hidden"
            id="product_service_charge"
            name="product_service_charge"
            value="0"
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="hidden"
            id="product_delivery_charge"
            name="product_delivery_charge"
            value="0"
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="hidden"
            id="success_url"
            name="success_url"
            value="http://localhost:3000/payment-sucess"
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="hidden"
            id="failure_url"
            name="failure_url"
            value="http://localhost:3000/payment-failure"
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="hidden"
            id="signed_field_names"
            name="signed_field_names"
            value={data.Payment.signed_field_names}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="hidden"
            id="signature"
            name="signature"
            value={data.Payment.signature}
            // onChange={(e) => setSignature(e.target.value)} // Allow manual input of signature
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="hidden"
            id="secret"
            name="secret"
            value={secretKey}
            className="border p-2 w-full rounded"
            required
          />

          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Pay with eSewa
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
