import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { error, success } from "../Utils/notification";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

function Signup() {
  const initialData = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    gender: "",
  };
  const [signUpcreds, setsignUpcreds] = useState(initialData);
  const [showpassword, setshowpassword] = useState(false);
  const navigate = useNavigate();

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setsignUpcreds({
      ...signUpcreds,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      signUpcreds.firstName === "" ||
      signUpcreds.lastName === "" ||
      signUpcreds.userName === "" ||
      signUpcreds.email === "" ||
      signUpcreds.password === "" ||
      signUpcreds.gender === ""
    ) {
      error("Please Fill All The Details");
      return;
    }

    try {
      let response = await axios.post(
        "http://localhost:8080/user/signup",
        signUpcreds
      );

      if (response.data.status === "Failed") {
        error(response.data.message);
        toast.error("Try again later");
      } else {
        navigate("/signin");
        success("Signup Successful, please login.");
      }
    } catch (error) {
      toast.error(
        "This email is already in use. Please try with a different email."
      );
    }
  };

  return (
    <div className="flex my-24 justify-center  items-center min-h-screen bg-gray-50 p-6 ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-96 md:w-1/2">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h1>

        {/* First Name */}
        <div className="mb-4 flex items-center justify-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 w-1/3"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your first name"
            value={signUpcreds.firstName}
            onChange={hanldeChange}
          />
        </div>

        {/* Last Name */}
        <div className="mb-4 flex items-center justify-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 w-1/3 "
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your last name"
            value={signUpcreds.lastName}
            onChange={hanldeChange}
          />
        </div>

        {/* Username */}
        <div className="mb-4 flex items-center justify-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 w-1/3"
            htmlFor="userName"
          >
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Choose a username"
            value={signUpcreds.userName}
            onChange={hanldeChange}
          />
        </div>

        {/* Gender */}
        <div className="mb-4 flex items-center justify-center">
          <label
            className="block text-gray-700 text-sm font-bold mb- w-1/3"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={signUpcreds.gender}
            onChange={hanldeChange}
          >
            <option value="">Select Your Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-4 flex items-center justify-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 w-1/3"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your email address"
            value={signUpcreds.email}
            onChange={hanldeChange}
          />
        </div>

        {/* Password */}
        <div className="mb-4 flex items-center justify-start">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 w-1/4 "
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showpassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
              value={signUpcreds.password}
              onChange={hanldeChange}
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setshowpassword(!showpassword)}
            >
              {showpassword ? (
                <AiFillEye size={20} />
              ) : (
                <AiFillEyeInvisible size={20} />
              )}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-1/3 py-3 font-bold bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
        >
          Sign Up
        </button>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-semibold">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-sm text-yellow-400 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
