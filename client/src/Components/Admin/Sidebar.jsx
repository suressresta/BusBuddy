// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import {
  FaBus,
  FaTicketAlt,
  FaSignOutAlt,
  FaRoad,
  FaHome,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../../Redux/authentication/auth.action";
import { success } from "../../Utils/notification";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    Cookies.remove("jwttoken");
    Cookies.remove("userid");
    dispatch(logoutAPI());
    navigate("/");
    success("Logout Successfully");
  };
  return (
    <div className="w-64 h-full bg-slate-800 text-white p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 flex justify-center">
        <span className="text-yellow-400">Admin Dashboard</span>
      </div>
      <ul className="space-y-6">
        <li>
          <Link
            to="/admin"
            className="flex items-center no-underline space-x-3 hover:bg-blue-700 p-2 rounded-md transition duration-300 text-white"
          >
            <FaHome size={20} />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            to="/admin/view-bookings"
            className="flex items-center no-underline space-x-3 hover:bg-blue-700 p-2 rounded-md transition duration-300 text-white"
          >
            <FaTicketAlt size={20} />
            <span>View Bookings</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/view-bus"
            className="flex items-center no-underline space-x-3 hover:bg-blue-700 p-2 rounded-md transition duration-300 text-white"
          >
            <FaBus size={20} />
            <span>View Bus</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/view-bus-route"
            className="flex items-center no-underline space-x-3 hover:bg-blue-700 p-2 rounded-md transition duration-300 text-white"
          >
            <FaRoad size={20} />
            <span>View Bus Route</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/settings"
            className="flex items-center no-underline space-x-3 hover:bg-blue-700 p-2 rounded-md transition duration-300 text-white"
          >
            <FaCog size={20} />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <div
            onClick={handleLogout}
            className="flex items-center no-underline space-x-3 hover:bg-blue-700 p-2 rounded-md transition duration-300 text-white"
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
