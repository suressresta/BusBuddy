import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBus } from "../../Redux/bus/reducer";
import { addRoute } from "../../Redux/route/reducer";
import { useNavigate } from "react-router-dom";
import { success, unsucess } from "../../Utils/notification";

const AddBusRoute = () => {
  // State to manage form data, including new fields
  const [routeDetails, setRouteDetails] = useState({
    from: "", // From location
    to: "", // To location
    arrival: "", // Arrival time
    departure: "", // Departure time
    price: "", // Price field
    bus: "", // Bus ID (dropdown to select bus)
    date: "", // Date of the route
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const busData = useSelector((state) => state.bus.busData);

  useEffect(() => {
    dispatch(getBus());
  }, []);

  // Get current date in the format YYYY-MM-DD
  const currentDate = new Date().toISOString().split("T")[0];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRouteDetails({
      ...routeDetails,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        !routeDetails.from ||
        !routeDetails.to ||
        !routeDetails.arrival ||
        !routeDetails.departure ||
        !routeDetails.price ||
        !routeDetails.bus ||
        !routeDetails.date
      ) {
        unsucess("All fields are required.");
      }
      const result = dispatch(addRoute(routeDetails));
      if (result?.status === "success") {
        setRouteDetails({
          from: "",
          to: "",
          arrival: "",
          departure: "",
          price: "",
          bus: "",
          date: "",
        });

        navigate("/admin/view-bus-route");
        success("Route Added sucessfully");
      } else {
        unsucess("Failed to add route. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Bus Route
        </h2>

        <form onSubmit={handleSubmit}>
          {/* From Location */}
          <div className="mb-2 flex items-center">
            <label
              htmlFor="from"
              className="block text-sm font-medium text-gray-600 w-1/3"
            >
              From
            </label>
            <input
              type="text"
              id="from"
              name="from"
              value={routeDetails.from}
              onChange={handleInputChange}
              className="mt-2 block w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* To Location */}
          <div className="mb-2 flex items-center">
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-600 w-1/3"
            >
              To
            </label>
            <input
              type="text"
              id="to"
              name="to"
              value={routeDetails.to}
              onChange={handleInputChange}
              className="mt-2 block w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Arrival Time */}
          <div className="mb-2 flex items-center">
            <label
              htmlFor="arrivalTime"
              className="block text-sm font-medium text-gray-600 w-1/3"
            >
              Arrival Time
            </label>
            <input
              type="time"
              id="arrival"
              name="arrival"
              value={routeDetails.arrival}
              onChange={handleInputChange}
              className="mt-2 block w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Departure Time */}
          <div className="mb-2 flex items-center">
            <label
              htmlFor="departureTime"
              className="block text-sm font-medium text-gray-600 w-1/3"
            >
              Departure Time
            </label>
            <input
              type="time"
              id="departure"
              name="departure"
              value={routeDetails.departure}
              onChange={handleInputChange}
              className="mt-2 block w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-2 flex items-center">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600 w-1/3"
            >
              Price (NPR)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={routeDetails.price}
              onChange={handleInputChange}
              className="mt-2 block w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Bus ID */}
          <div className="mb-2 flex items-center">
            <label
              htmlFor="bus"
              className="block text-sm font-medium text-gray-600 w-1/3"
            >
              Bus
            </label>
            <select
              id="bus"
              name="bus"
              value={routeDetails.bus}
              onChange={handleInputChange}
              className="mt-2 block w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select Bus</option>
              {busData &&
                busData.map((bus) => (
                  <option key={bus.id} value={bus._id}>
                    {bus.companyName}
                  </option>
                ))}
            </select>
          </div>

          {/* Date */}
          <div className="mb-4 flex items-center">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-600 w-1/3"
            >
              Route Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={routeDetails.date}
              onChange={handleInputChange}
              min={currentDate}
              className="mt-2 block w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Add Route
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBusRoute;
