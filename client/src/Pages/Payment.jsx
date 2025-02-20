import React, { useState } from "react";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [transactionUuid, setTransactionUuid] = useState("");
  const [signature, setSignature] = useState("");
  const secretKey = "8gBm/:&EnhH.1/q";

  return (
    <div className="p-6 mt-24">
      <b>eSewa ID:</b> 9806800001/2/3/4/5 <br />
      <b>Password:</b> Nepal@123 <br />
      <b>MPIN:</b> 1122 <b>Token:</b> 123456
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        target="_blank"
        className="mt-4"
      >
        <table className="table-auto w-full border-separate border-spacing-4">
          <tbody>
            <tr>
              <td className="font-bold">Parameter</td>
              <td className="font-bold">Value</td>
            </tr>
            <tr>
              <td>Amount:</td>
              <td>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Tax Amount:</td>
              <td>
                <input
                  type="text"
                  id="tax_amount"
                  name="tax_amount"
                  value="0"
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Total Amount:</td>
              <td>
                <input
                  type="text"
                  id="total_amount"
                  name="total_amount"
                  value={amount}
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Transaction UUID:</td>
              <td>
                <input
                  type="text"
                  id="transaction_uuid"
                  name="transaction_uuid"
                  value={transactionUuid}
                  onChange={(e) => setTransactionUuid(e.target.value)}
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Product Code:</td>
              <td>
                <input
                  type="text"
                  id="product_code"
                  name="product_code"
                  value="EPAYTEST"
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Product Service Charge:</td>
              <td>
                <input
                  type="text"
                  id="product_service_charge"
                  name="product_service_charge"
                  value="0"
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Product Delivery Charge:</td>
              <td>
                <input
                  type="text"
                  id="product_delivery_charge"
                  name="product_delivery_charge"
                  value="0"
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Success URL:</td>
              <td>
                <input
                  type="text"
                  id="success_url"
                  name="success_url"
                  value="http://localhost:8080/payment/complete-payment"
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Failure URL:</td>
              <td>
                <input
                  type="text"
                  id="failure_url"
                  name="failure_url"
                  value="https://developer.esewa.com.np/failure"
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Signed Field Names:</td>
              <td>
                <input
                  type="text"
                  id="signed_field_names"
                  name="signed_field_names"
                  value="total_amount,transaction_uuid,product_code"
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Signature:</td>
              <td>
                <input
                  type="text"
                  id="signature"
                  name="signature"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)} // Allow manual input of signature
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Secret Key:</td>
              <td>
                <input
                  type="text"
                  id="secret"
                  name="secret"
                  value={secretKey}
                  className="border p-2 w-full rounded"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Pay with eSewa
        </button>
      </form>
    </div>
  );
};

export default Payment;
