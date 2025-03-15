import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../Components/Admin/Dashboard";
import AddBus from "../Components/Admin/AddBus";
import AddBusRoute from "../Components/Admin/AddBusRoute";
import ViewBooking from "../Components/Admin/ViewBooking";
import ViewBus from "../Components/Admin/ViewBus";
import Sidebar from "../Components/Admin/Sidebar";
import ViewRoute from "../Components/Admin/ViewRoute";
import Cookies from "js-cookie";
import { logoutAPI } from "../Redux/authentication/auth.action";
import { useDispatch } from "react-redux";
import { error } from "../Utils/notification";
import NotFoundPage from "../Pages/NotFoundPage";
import Settings from "../Components/Admin/Settings";

const AdminRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("jwttoken");
    if (!token) {
      navigate("/signin");
      dispatch(logoutAPI());
      error("Please Login");
    }
  }, [navigate]);

  return (
    <div className="h-screen flex">
      <div className="w-1/4 h-full ">
        <Sidebar />
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/add-bus" element={<AddBus />} />
          <Route path="/admin/add-bus-route" element={<AddBusRoute />} />
          <Route path="/admin/view-bookings" element={<ViewBooking />} />
          <Route path="/admin/view-bus" element={<ViewBus />} />
          <Route path="/admin/view-bus-route" element={<ViewRoute />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
