import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBus } from "../../Redux/bus/reducer";

const AddBus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [busDetails, setBusDetails] = useState({
    amenities: "",
    companyName: "",
    email: "",
    phone: "",
    rating: 0,
    totalSeat: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusDetails({
      ...busDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amenitiesArray = busDetails.amenities
      .split(/[,\s]+/)
      .map((amenity) => amenity.trim()) // Remove any extra spaces around the items
      .filter((amenity) => amenity); // Remove any empty values from the array

    // Update the busDetails with the amenities array
    const updatedBusDetails = {
      ...busDetails,
      amenities: amenitiesArray,
    };
    dispatch(addBus(updatedBusDetails)).then(() => {
      navigate("/admin");
      setBusDetails({
        amenities: "",
        companyName: "",
        email: "",
        phone: "",
        rating: 0,
        totalSeat: 0,
      });
    });
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-sm rounded-md mt-10">
      <h2 className="text-xl font-medium text-gray-800 mb-4 text-center">
        Add New Bus
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={busDetails.companyName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={busDetails.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={busDetails.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={busDetails.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="totalSeat"
            className="block text-sm font-medium text-gray-700"
          >
            Total Seats
          </label>
          <input
            type="number"
            id="totalSeat"
            name="totalSeat"
            value={busDetails.totalSeat}
            onChange={handleChange}
            min="1"
            required
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="amenities"
            className="block text-sm font-medium text-gray-700"
          >
            Amenities
          </label>
          <input
            type="text"
            id="amenities"
            name="amenities"
            value={busDetails.amenities}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <small className="text-xs text-gray-500">
            Enter amenities separated by commas (e.g., AC, Wi-Fi)
          </small>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Bus
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBus;
