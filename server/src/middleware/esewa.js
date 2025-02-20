const axios = require("axios");
const crypto = require("crypto");

async function getEsewaPaymentHash({ amount, transaction_uuid }) {
  try {
    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;

    const secretKey = process.env.ESEWA_SECRET_KEY;
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");
    console.log("The signature:", hash);
    return {
      signature: hash,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };
  } catch (error) {
    throw error;
  }
}

async function verifyEsewaPayment(encodedData) {
  try {
    console.log("Encoded Data:", encodedData); // Log the encoded data for debugging

    // Decode the data
    let decodedData = Buffer.from(encodedData, "base64").toString("utf8");

    console.log("Decoded Data (Raw):", decodedData); // Log the raw decoded string

    // Parse the decoded data into a JavaScript object
    decodedData = await JSON.parse(decodedData);

    console.log("Decoded Data (Parsed):", decodedData); // Log the parsed object

    // Check if `transaction_uuid` exists in the decoded data
    if (!decodedData.transaction_uuid) {
      throw new Error("Missing transaction_uuid in decoded data");
    }

    // Proceed with the rest of your logic
    let amount = decodedData.total_amount.replace(/,/g, "");

    // Prepare data for hashing
    const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;

    console.log("Data to Hash:", data);

    const secretKey = process.env.ESEWA_SECRET_KEY;

    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    console.log("Computed Hash:", hash);
    console.log("Received Signature:", decodedData.signature);

    // Signature verification
    if (hash !== decodedData.signature) {
      throw { message: "Invalid signature", decodedData };
    }

    // If all checks pass, return success
    return {
      success: true,
      message: "Payment verification successful",
      decodedData,
    };
  } catch (error) {
    console.error("Error during verification:", error.message || error);
    throw error;
  }
}

module.exports = { verifyEsewaPayment, getEsewaPaymentHash };
