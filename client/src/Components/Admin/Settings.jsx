import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserDetails,
} from "../../Redux/authentication/auth.reducer";
import { FaUserEdit } from "react-icons/fa";

import EditProfileModal from "../showModal/EditProfileModal";
import PasswordResetModal from "../showModal/PasswordResetModal";

const Settings = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.data.userid);

  const openEditModal = () => {
    setIsEdit(true);
  };
  const closeEditModal = () => {
    setIsEdit(false);
  };
  const openPassowrdEditModal = () => {
    setIsPassword(true);
  };
  const closePasswordEditModal = () => {
    setIsPassword(false);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetails(userId));
    }
  }, [userId, dispatch]);

  if (!user || !user.userName || !user.email) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100  text-black">
      <div className="px-8 bg-gray-100 rounded-lg w-96 shadow-lg transition-transform transform hover:scale-105 ">
        {/* Modal Header */}
        <div className="flex justify-center items-center mb-4 ">
          <h2 className="text-xl font-semibold  w-fsull pt-3">Admin Profile</h2>
        </div>

        {/* User Information */}
        <div className="space-y-4 text-start ">
          <p className="">
            <strong className=" ">User Name:</strong> {user.userName}
          </p>
          <p className=" ">
            <strong className=" ">Email:</strong> {user.email}
          </p>
          <p className=" ">
            <strong className=" ">Role:</strong> {user.role}
          </p>
        </div>
        <div
          onClick={openPassowrdEditModal}
          className="w-1/4 text-sm text-start mt-2 hover:underline hover:scale-110 transition duration-300 cursor-pointer font-semibold text-red-500"
        >
          password?
        </div>

        {/* Action Buttons */}
        <div className="my-4 space-y-3 ">
          <button
            className="w-full border-2 border-yellow-400 flex items-center justify-center    px-4 py-2 rounded-lg hover:scale-110 transition duration-300"
            onClick={openEditModal}
          >
            Edit Profile <FaUserEdit className="mx-2 text-xl " />
          </button>
        </div>
      </div>
      {isEdit && (
        <EditProfileModal user={user} closeEditModal={closeEditModal} />
      )}
      {/* Password Reset */}

      {isPassword && (
        <PasswordResetModal
          user={user._id}
          closePasswordEditModal={closePasswordEditModal}
        />
      )}
    </div>
  );
};

export default Settings;
