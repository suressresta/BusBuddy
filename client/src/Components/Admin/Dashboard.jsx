import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-gray-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold">
            <span className='text-yellow-600'>Bus</span>Buddy{" "}
          </h1>
          <button className="bg-white text-yellow-600 px-4 py-2 rounded shadow-md">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card: Total Tickets Sold */}
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-xl font-semibold text-yellow-700">
              Total Tickets Sold
            </h2>
            <p className="text-4xl font-bold text-yellow-600 mt-4">1,234</p>
          </div>

          {/* Card: Revenue */}
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-xl font-semibold text-yellow-700">
              Total Revenue
            </h2>
            <p className="text-4xl font-bold text-yellow-600 mt-4">$12,345</p>
          </div>

          {/* Card: Active Routes */}
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-xl font-semibold text-yellow-700">
              Active Routes
            </h2>
            <p className="text-4xl font-bold text-yellow-600 mt-4">15</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mt-8 bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
            Recent Bookings
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-4 text-left text-yellow-700">
                  Booking ID
                </th>
                <th className="border-b p-4 text-left text-yellow-700">
                  Passenger Name
                </th>
                <th className="border-b p-4 text-left text-yellow-700">
                  Route
                </th>
                <th className="border-b p-4 text-left text-yellow-700">Date</th>
                <th className="border-b p-4 text-left text-yellow-700">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b p-4">#12345</td>
                <td className="border-b p-4">John Doe</td>
                <td className="border-b p-4">City A - City B</td>
                <td className="border-b p-4">2024-12-15</td>
                <td className="border-b p-4">$25</td>
              </tr>
              <tr>
                <td className="border-b p-4">#12346</td>
                <td className="border-b p-4">Jane Smith</td>
                <td className="border-b p-4">City C - City D</td>
                <td className="border-b p-4">2024-12-14</td>
                <td className="border-b p-4">$30</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
