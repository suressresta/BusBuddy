import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBus, getBus, updateBusData } from "../../Redux/bus/reducer";
import { useNavigate } from "react-router-dom";

const ViewBus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const busData = useSelector((state) => state.bus.busData);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [updatedBus, setUpdatedBus] = useState({
    companyName: "",
    email: "",
    phone: "",
    rating: "",
    totalSeat: "",
    amenities: [],
  });

  useEffect(() => {
    dispatch(getBus());
  }, []);

  const openModal = (bus) => {
    setSelectedBus(bus);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBus(null);
  };

  const openEditModal = (bus) => {
    setUpdatedBus({
      companyName: bus.companyName,
      email: bus.email,
      phone: bus.phone,
      rating: bus.rating,
      totalSeat: bus.totalSeat,
      amenities: bus.amenities,
    });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setUpdatedBus({
      companyName: "",
      email: "",
      phone: "",
      rating: "",
      totalSeat: "",
      amenities: [],
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "amenities") {
      setUpdatedBus((prevState) => ({
        ...prevState,
        amenities: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setUpdatedBus((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = () => {
    dispatch(updateBusData(updatedBus, selectedBus._id));
    dispatch(getBus());
    setModalOpen(false);
    closeEditModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteBus(id));
    closeModal();
  };

  const handleAdd = () => {
    navigate("/admin/add-bus");
  };

  return (
    <div className="h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div className="border-b-4 mb-6 border-black">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Available Buses
          </h2>
          <button
            onClick={handleAdd}
            className="mb-4 border-2 p-2 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
          >
            Add Bus
          </button>
        </div>

        {/* Bus List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {busData.map((bus, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer"
              onClick={() => openModal(bus)}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {bus.companyName}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-gray-700">
                  <p>
                    <strong>Email:</strong> {bus.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {bus.phone}
                  </p>
                  <p>
                    <strong>Total Seats:</strong> {bus.totalSeat}
                  </p>
                  <p>
                    <strong>Amenities:</strong> {bus.amenities.join(", ")}
                  </p>
                  <p>
                    <strong>Rating:</strong> {bus.rating} / 5
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal to show detailed bus information */}
      {modalOpen && selectedBus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg  shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {selectedBus.companyName} - {selectedBus.from} to {selectedBus.to}
            </h3>
            <div className="space-y-4 ">
              <p>
                <strong>Bus no:</strong> {selectedBus.number}
              </p>
              <p>
                <strong>Email:</strong> {selectedBus.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedBus.phone}
              </p>
              <p>
                <strong>Total Seats:</strong> {selectedBus.totalSeat}
              </p>
              <p>
                <strong>Amenities:</strong> {selectedBus.amenities.join(", ")}
              </p>
              <p>
                <strong>Rating:</strong> {selectedBus.rating} / 5
              </p>
            </div>

            {/* Action buttons (Edit and Delete) */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => openEditModal(selectedBus)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(selectedBus._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bus Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Bus
            </h3>
            <form>
              <div className="space-y-4">
                {/* Form Fields */}
                <div>
                  <label className="block text-gray-700">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={updatedBus.companyName}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={updatedBus.email}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={updatedBus.phone}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={updatedBus.rating}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Total Seats</label>
                  <input
                    type="number"
                    name="totalSeat"
                    value={updatedBus.totalSeat}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Amenities</label>
                  <input
                    type="text"
                    name="amenities"
                    value={updatedBus.amenities.join(", ")}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Action buttons for the edit form */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                >
                  Save Changes
                </button>
                <button
                  onClick={closeEditModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBus;
