import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "../Styles/details.module.css";
import { validateEmail, validateMobile } from "../Utils/formValidator";
import { error, success } from "../Utils/notification";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { PostRequest } from "../plugins/https";
import { addOrder, getOrder } from "../Redux/order/reducer";
import { clearSeat } from "../Redux/order/action";
import Payment from "./Payment";

function Details() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const initialData = {
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
  };
  const [creds, setcreds] = useState(initialData);

  const [showPayButton, setShowPayButton] = useState(false);

  function hanldeChange(e) {
    setcreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  }

  const amount = useSelector((state) => state.order.totalPrice);
  const seat = useSelector((state) => state.order.seats);
  const order = useSelector((state) => state.order.setData || {});
  console.log("The res data are:", order);

  async function handleclick(e) {
    e.preventDefault();
    let routeId = params.id;

    let token = Cookies.get("jwttoken");
    let userid = Cookies.get("userid");
    console.log("User ID from cookies:", userid);

    // Validation checks
    if (
      creds.name === "" ||
      creds.age === "" ||
      creds.gender === "" ||
      creds.email === "" ||
      creds.phone === ""
    ) {
      return error("Please fill all details");
    }

    const isEmail = validateEmail(creds.email);
    if (!isEmail.status) {
      return error(isEmail.message);
    }

    const isMobile = validateMobile(creds.phone);
    if (!isMobile.status) {
      return error(isMobile.message);
    }
    if (amount <= 0) {
      alert("Please Try Again");
      navigate(-1); // Navigate back to the previous page
      return; // Prevent further execution if the amount is invalid
    }
    // Prepare the data to send in the POST request
    const orderData = {
      route: routeId,
      userDetails: {
        name: creds.name,
        age: creds.age,
        gender: creds.gender,
        email: creds.email,
        phone: creds.phone,
      },
      user: userid,
      totalAmount: amount,
      seatNumber: seat,
    };

    try {
      dispatch(addOrder(orderData)).then(() => {
        setShowPayButton(true);
      });
      // dispatch(clearSeat());
      // navigate("/");
      // success("Ticket booked successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again.");
    }
  }

  return (
    <div className="min-h-screen w-full my-24 flex justify-center items-center">
      <form
        onSubmit={(e) => handleclick(e)}
        className="w-1/2 h-auto border-2 p-4 shadow-xl rounded-2xl "
      >
        {/* Name Field */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <label
            htmlFor="name"
            className="pb-2 font-bold text-lg text-gray-700"
          >
            Name
          </label>
          <input
            name="name"
            value={creds.name}
            onChange={hanldeChange}
            type="text"
            placeholder="Enter your full name"
            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-10/12 md:w-8/12 lg:w-8/12 rounded-lg p-2 text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-300"
          />
        </div>

        {/* Age Field */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <label htmlFor="age" className="pb-2 font-bold text-lg text-gray-700">
            Age
          </label>
          <input
            name="age"
            value={creds.age}
            onChange={hanldeChange}
            type="number"
            placeholder="Enter your age"
            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-10/12 md:w-8/12 lg:w-8/12 rounded-lg p-2 text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-300"
          />
        </div>

        {/* Gender Field */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <label
            htmlFor="gender"
            className="pb-2 font-bold text-lg text-gray-700"
          >
            Gender
          </label>
          <select
            name="gender"
            value={creds.gender}
            onChange={hanldeChange}
            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-10/12 md:w-8/12 lg:w-8/12 rounded-lg p-2 text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-300"
          >
            <option value="">Select Your Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>

        {/* Email Field */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <label
            htmlFor="email"
            className="pb-2 font-bold text-lg text-gray-700"
          >
            Email
          </label>
          <input
            name="email"
            value={creds.email}
            onChange={hanldeChange}
            type="email"
            placeholder="Enter your email"
            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-10/12 md:w-8/12 lg:w-8/12 rounded-lg p-2 text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-300"
          />
        </div>

        {/* Phone Field */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <label
            htmlFor="phone"
            className="pb-2 font-bold text-lg text-gray-700"
          >
            Phone No
          </label>
          <input
            name="phone"
            value={creds.phone}
            onChange={hanldeChange}
            type="tel"
            placeholder="Enter your phone number"
            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-10/12 md:w-8/12 lg:w-8/12 rounded-lg p-2 text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className=" bg-blue-500 text-white py-2 mb-3 rounded-lg hover:bg-blue-600 transition duration-300 w-10/12 md:w-8/12 lg:w-8/12"
        >
          Submit
        </button>
        {/* Payment Component */}
        {showPayButton && order && <Payment data={order} />}
      </form>
    </div>
  );
}

export default Details;
