// Dashboard.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";  // Import the Sidebar component
import { RiBarChartBoxLine } from "react-icons/ri"; // Adding a chart icon for the dashboard

const Dashboard = () => {
  // State for holding dashboard statistics (these can come from an API)
  const [stats] = useState({
    totalBookings: 120,
    totalBuses: 10,
    totalUsers: 50,
    revenue: 20000, // Added a revenue stat for a more realistic example
  });

  return (
    <div className="h-screen   bg-gray-50">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to the Admin Dashboard
          </h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            View All Stats
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-md shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold mb-4">Total Bookings</h2>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalBookings}
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold mb-4">Total Buses</h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalBuses}
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold mb-4">Total Users</h2>
            <p className="text-3xl font-bold text-purple-600">
              {stats.totalUsers}
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold mb-4">Revenue</h2>
            <p className="text-3xl font-bold text-yellow-600">
              ${stats.revenue}
            </p>
          </div>
        </div>

        {/* Recent Activity / Quick Stats */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Recent Activity
          </h2>
          <div className="bg-white p-6 rounded-md shadow-lg hover:shadow-2xl transition duration-300">
            <RiBarChartBoxLine size={50} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sales Trend</h3>
            <p className="text-gray-600">
              View the latest sales trends and patterns for bookings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
