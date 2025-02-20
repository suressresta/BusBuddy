import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditProfileModal from "./EditProfileModal";
import PasswordResetModal from "./PasswordResetModal";
import { deleteUserDetails } from "../../Redux/authentication/auth.reducer";
import { useDispatch } from "react-redux";
import { success, unsucess } from "../../Utils/notification";
import { logoutAPI } from "../../Redux/authentication/auth.action";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProfileModal = ({ user, closeModal }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  if (isEdit)
    return <EditProfileModal user={user} closeEditModal={closeEditModal} />;

  if (isPassword) {
    return (
      <PasswordResetModal
        user={user._id}
        closePasswordEditModal={closePasswordEditModal}
      />
    );
  }

  const handleDeactivate = () => {
    try {
      dispatch(deleteUserDetails(user._id));
      Cookies.remove("jwttoken");
      Cookies.remove("userid");
      Cookies.remove("userRole");
      dispatch(logoutAPI());
      navigate("/");
      success("Account deleted sucessfully");
    } catch (error) {
      unsucess("Internal server erro. Pleaase try again");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="  bg-black z-50 bg-opacity-50 px-8 rounded-lg w-96 shadow-lg transition-transform transform hover:scale-105">
        {/* Modal Header */}
        <div className="flex justify-between mb-4 ">
          <h2 className="text-xl font-semibold text-white  w-full pt-3">
            User Profile
          </h2>
          <button
            onClick={closeModal}
            className="text-white text-2xl top-0 hover:scale-125 duration-300"
          >
            &times;
          </button>
        </div>

        {/* User Information */}
        <div className="space-y-4 text-start">
          <p className="text-white">
            <strong className=" ">User Name:</strong> {user.userName}
          </p>

          <p className="text-white">
            <strong className="text-white">Email:</strong> {user.email}
          </p>
        </div>
        <div
          onClick={openPassowrdEditModal}
          className="w-1/4 text-sm text-start mt-2 hover:underline hover:scale-110 transition duration-300 cursor-pointer text-yellow-400"
        >
          password?
        </div>

        {/* Action Buttons */}
        <div className="my-4 space-y-3 ">
          <button
            className="w-full border-2 border-yellow-400 flex items-center justify-center  text-white px-4 py-2 rounded-lg hover:scale-110 transition duration-300"
            onClick={openEditModal}
          >
            Edit Profile <FaUserEdit className="mx-2 text-xl " />
          </button>
          <button
            className="w-full border-2  border-red-500 text-white flex items-center justify-center px-4 py-2 rounded-lg hover:scale-110 transition duration-300"
            onClick={handleDeactivate}
          >
            Deactivate Account <MdDeleteOutline className="mx-2 text-2xl" />
          </button>
        </div>
      </div>
      {/* ProfileModal */}
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

export default ProfileModal;
