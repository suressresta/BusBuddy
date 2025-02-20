import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoute,
  deleteRoute,
  updateRouteData,
} from "../../Redux/route/reducer"; // Add updateRoute action
import { useNavigate } from "react-router";
import { getBus } from "../../Redux/bus/reducer";

const ViewRoute = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New state for the edit modal
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [editedRoute, setEditedRoute] = useState({
    from: "",
    to: "",
    date: "",
    departure: "",
    arrival: "",
    bus: "",
  });  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routeData = useSelector((state) => state.route.routeData);

  useEffect(() => {
    dispatch(getRoute());
    dispatch(getBus());
  }, []);

  const busData = useSelector((state) => state.bus.busData);

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
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoute(null);
  };

  const handleAdd = () => {
    navigate("/admin/add-bus-route");
  };

  const handleDelete = () => {
    if (selectedRoute) {
      dispatch(deleteRoute(selectedRoute._id));
      dispatch(getRoute());
      closeModal();
    }
  };

  const handleEdit = () => {
    if (selectedRoute) {
      setEditedRoute({
        from: selectedRoute.from,
        to: selectedRoute.to,
        date: selectedRoute.date,
        departure: selectedRoute.departure,
        arrival: selectedRoute.arrival,
        bus: { ...selectedRoute.bus },
      });
      setIsEditModalOpen(true);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedRoute((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    if (selectedRoute) {
      const updatedRoute = { ...selectedRoute, ...editedRoute };
      dispatch(updateRouteData(updatedRoute, selectedRoute._id));
      dispatch(getRoute());
      setSelectedRoute(updatedRoute);
      setIsEditModalOpen(false);
      closeModal();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">View Routes</h1>
      <button
        onClick={handleAdd}
        className="mb-4 border-2 p-2 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
      >
        Add Route
      </button>

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
            <li>No routes found based on the filter criteria</li>
          )}
        </ul>
      </div>

      {/* Modal for route details */}
      {isModalOpen && selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            {/* X Button to close modal */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Route Details</h2>
            <p>
              <strong>From:</strong> {selectedRoute.from}
            </p>
            <p>
              <strong>To:</strong> {selectedRoute.to}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedRoute.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Departure Time:</strong> {selectedRoute.departure}
            </p>
            <p className="border-b-2 border-black pb-2">
              <strong>Arrival Time:</strong> {selectedRoute.arrival}
            </p>
            <p>
              <strong>Bus Details</strong>
            </p>
            <p>
              <strong>Bus Company:</strong> {selectedRoute.bus.companyName}
            </p>
            <p>
              <strong>Bus Phone No:</strong> {selectedRoute.bus.phone}
            </p>
            <p>
              <strong>Bus Email:</strong> {selectedRoute.bus.email}
            </p>
            <p>
              <strong>Bus Total Seat:</strong> {selectedRoute.bus.totalSeat}
            </p>
            <p>
              <strong>Bus Amenities:</strong>
              {selectedRoute &&
              selectedRoute.bus &&
              selectedRoute.bus.amenities &&
              selectedRoute.bus.amenities.length > 0
                ? selectedRoute.bus.amenities.join(" ")
                : "No amenities available"}
            </p>

            {/* Edit and Delete buttons */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h2 className="text-xl font-semibold mb-4">Edit Route</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <input
              type="text"
              name="from"
              value={editedRoute.from}
              onChange={handleEditChange}
              className="p-2 border rounded-md w-full mb-2"
              placeholder="From"
            />
            <input
              type="text"
              name="to"
              value={editedRoute.to}
              onChange={handleEditChange}
              className="p-2 border rounded-md w-full mb-2"
              placeholder="To"
            />
            <input
              type="date"
              name="date"
              value={editedRoute.date}
              onChange={handleEditChange}
              className="p-2 border rounded-md w-full mb-2"
            />
            <input
              type="text"
              name="departure"
              value={editedRoute.departure}
              onChange={handleEditChange}
              className="p-2 border rounded-md w-full mb-2"
              placeholder="Departure Time"
            />
            <input
              type="text"
              name="arrival"
              value={editedRoute.arrival}
              onChange={handleEditChange}
              className="p-2 border rounded-md w-full mb-2"
              placeholder="Arrival Time"
            />
            <div className="mb-2 flex items-center">
              <select
                id="bus"
                name="bus"
                value={editedRoute.bus}
                onChange={handleEditChange}
                className="mt-2 block  px-4 py-2 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mt-4"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRoute;
