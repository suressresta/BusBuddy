import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoute,
  deleteRoute,
  updateRouteData,
} from "../../Redux/route/reducer";
import { useNavigate } from "react-router";
import { getBus } from "../../Redux/bus/reducer";
import { getOrder, getOrderSeat } from "../../Redux/order/reducer";
import { BiArrowFromLeft } from "react-icons/bi";

const ViewBoking = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routeData = useSelector((state) => state.route.routeData);
  // console.log("Route data:", routeData);
  const orderData = useSelector((state) => state.order.seatOrder);

  console.log("The order data are:", orderData);
  useEffect(() => {
    dispatch(getRoute());
    dispatch(getBus());
    dispatch(getOrder());
  }, []);

  useEffect(() => {
    if (routeData.length > 0) {
      setFilteredRoutes(routeData);
    }
  }, [routeData]);

  const handleFilter = () => {
    const filtered = routeData.filter((route) => {
      return (
        (from ? route.from.toLowerCase().includes(from.toLowerCase()) : true) &&
        (to ? route.to.toLowerCase().includes(to.toLowerCase()) : true) &&
        (date
          ? new Date(route.date).toLocaleDateString() ===
            new Date(date).toLocaleDateString()
          : true)
      );
    });
    setFilteredRoutes(filtered);
  };

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
    dispatch(getOrderSeat(route._id)); // Fetching order data for the selected route
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoute(null);
  };

  const calculateBookedSeats = () => {
    if (!orderData || orderData.length === 0) return 0;

    const bookedSeats = orderData.reduce(
      (acc, order) => acc + order.seatNumber.length,
      0
    );
    return bookedSeats;
  };

  const availableSeats = () => {
    if (!selectedRoute) return 0;
    const totalSeats = selectedRoute.totalSeat;
    const bookedSeats = calculateBookedSeats();
    return totalSeats - bookedSeats;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">View Booking</h1>

      {/* Filter inputs */}
      <div className="space-x-4 mb-6">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Route list */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Routes</h2>
        <ul className="space-y-2 w-full flex flex-col items-center justify-center">
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <li
                key={route._id}
                className="p-4 border rounded-md cursor-pointer hover:bg-gray-100 w-1/2"
                onClick={() => handleRouteClick(route)}
              >
                {route.from} → {route.to} on{" "}
                {new Date(route.date).toLocaleDateString()}
              </li>
            ))
          ) : (
            <li>No Booking found based on the filter criteria</li>
          )}
        </ul>
      </div>

      {/* Modal for order details */}
      {isModalOpen && selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-10">
          <div className="bg-white p-6 rounded-lg w-full mx-24 relative">
            {/* X Button to close modal */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-3xl hover:scale-125 duration-300"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
            <h3>{selectedRoute.bus.companyName}</h3>
            <div className="flex justify-center items-center ">
              <p>{selectedRoute.from}</p>
              <p className="mx-8">
                <BiArrowFromLeft />
              </p>
              <p>{selectedRoute.to}</p>
              <p className="mx-4">
                {new Date(selectedRoute.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="w-full flex items-center justify-center mb-4">
              <div className="w-1/3 flex justify-between">
                <p>Total Seat : {selectedRoute.totalSeat}</p>
                <p>Avaliable Seat : {availableSeats()}</p>
              </div>
            </div>
            {/* Table for displaying booking details */}
            {orderData && orderData.length > 0 ? (
              <table className="min-w-full table-auto border-collapse border">
                <thead>
                  <tr className="border-b">
                    {/* <th className="px-4 py-2 text-left">Registered Date</th> */}
                    <th className="px-4 py-2 text-center">Contact Number</th>
                    <th className="px-4 py-2 text-center">Name</th>
                    <th className="px-4 py-2 text-center">Seats Booked</th>
                    <th className="px-4 py-2 text-center">Total</th>
                    <th className="px-4 py-2 text-center">Booked Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((order) => (
                    <tr key={order._id} className="border-2">
                      {/* <td className="px-4 py-2">
                      </td> */}
                      <td className="px-4 py-2 border">{order.userName}</td>
                      <td className="px-4 py-2 border">{order.number}</td>
                      <td className="px-4 py-2 border">
                        {order.seatNumber.join(", ")}
                      </td>{" "}
                      {/* SeatNumber column */}
                      <td className="px-4 py-2 border">
                        Rs {order.totalAmount} ({order.status})
                      </td>
                      <td className="px-4 py-2 border">
                        {new Date(order.registeredDate).toLocaleDateString(
                          "en-GB",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No order data available for this Order data.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBoking;
