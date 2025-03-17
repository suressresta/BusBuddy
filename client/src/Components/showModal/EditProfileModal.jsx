import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../Redux/authentication/auth.reducer";
import { success } from "../../Utils/notification";

const EditProfileModal = ({ user, closeEditModal }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    fullName: user.userName || "",
    age: user.age || "",
    email: user.email || "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      fullName: user.userName || "",
      gender: user.gender || "",
      email: user.email || "",
      password: "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("Form data submitted:", formData);
      // Dispatch the update action
      dispatch(updateUserDetails(formData, user._id));
      success("Updated Sucessfully");
      closeEditModal();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Incorrect Password"
      ) {
        alert("Incorrect Password");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ">
      <div className="bg-black bg-opacity-50 border-2 rounded-lg text-white shadow-lg p-6 w-96">
        <button
          onClick={closeEditModal}
          className="absolute top-2 right-1/4 text-2xl hover:scale-125 duration-300"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* firtName */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border text-black border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border text-black border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border text-black border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-white"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border text-black border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border text-black border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border text-black border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2   right-4  "
            >
              {passwordVisible ? (
                <FaEyeSlash className="text-black" size={20} />
              ) : (
                <FaEye className="text-black" size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-transparent border-2 border-yellow-400 hover:scale-110 duration-300 text-white py-2 px-4 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
