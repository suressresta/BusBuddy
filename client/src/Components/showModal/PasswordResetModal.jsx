import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getUserDetails,
  updateUserDetails,
} from "../../Redux/authentication/auth.reducer";
import { success } from "../../Utils/notification";

const PasswordResetModal = ({ user, closePasswordEditModal }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  console.log("User:", user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }
    try {
      // alert("Password reset successfully!");
      console.log(oldPassword, newPassword, confirmPassword);
      const id = user;
      const password = {
        password: oldPassword,
        newPassword: confirmPassword,
      };
      dispatch(updateUserDetails(password, id));
      dispatch(getUserDetails(id));
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      success("Password Changed sucessfully");
      closePasswordEditModal();
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="bg-black bg-opacity-50 border-2 rounded-lg text-white shadow-lg p-6 w-96">
          <button
            onClick={closePasswordEditModal}
            className="absolute top-2 right-2 text-xl hover:scale-125 duration-300"
          >
            &times;
          </button>
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="my-4 ">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-white"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old Password"
                className="mt-1 block w-full px-4 py-2 border text-black  border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-white"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new Password"
                className="mt-1 block w-full px-4 py-2 border text-black  border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter new Password again"
                className="mt-1 block w-full px-4 py-2 border text-black  border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-transparent border-2 border-yellow-400 hover:scale-110 duration-300 text-white py-2 px-4 rounded-lg"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordResetModal;
