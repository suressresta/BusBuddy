import React, { useEffect, useState } from "react";
import { MdOutlineChair } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { AiTwotoneStar } from "react-icons/ai";
import { BiArrowFromLeft } from "react-icons/bi";
import { getRouteId } from "../Redux/route/reducer";
import { addSeat } from "../Redux/order/action";
import { error } from "../Utils/notification";
import { getOrderSeat } from "../Redux/order/reducer";

const Seat = ({ seatNumber, isSelected, isBooked, onClick }) => {
  return (
    <MdOutlineChair
      className={`text-4xl cursor-pointer ${
        isBooked
          ? "text-red-600 cursor-not-allowed"
          : isSelected
          ? "text-green-500"
          : "text-gray-400"
      }`}
      onClick={!isBooked ? onClick : null}
    />
  );
};

const SeatSelection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedSeats, setSelectedSeats] = useState([]);

  const data = useSelector((state) => state.route.route);
  const seatData = useSelector((state) => state.order.seatOrder);

  console.log("The seat data are:", seatData);
  const totalSeats = data.totalSeat;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRouteId(id));
    dispatch(getOrderSeat(id));
  }, [id, dispatch]);

  // Ensure the route data is loaded
  if (!data || !data.bus) {
    return <div>Loading...</div>;
  }

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
      setSelectedSeats(updatedSeats);
    } else {
      if (selectedSeats.length < 10) {
        const updatedSeats = [...selectedSeats, seatNumber];
        setSelectedSeats(updatedSeats);
        console.log("Selected Seats after selecting:", updatedSeats);
      } else {
        alert("You can only select a maximum of 10 seats.");
      }
    }
  };

  const isSeatBooked = (seatNumber) => {
    return seatData.some((seat) => seat.seatNumber.includes(seatNumber));
  };
  const bookedSeatsCount = seatData.reduce(
    (avaliableSeat, order) => avaliableSeat + order.seatNumber.length,
    0
  );

  const renderSeat = () => {
    let seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      const rowPrefix = i <= 21 ? "A" : "B";
      const seatNumber = `${rowPrefix}${i}`;
      const isBooked = isSeatBooked(seatNumber);
      seats.push(
        <Seat
          key={seatNumber}
          seatNumber={seatNumber}
          isSelected={selectedSeats.includes(seatNumber)}
          isBooked={isBooked}
          onClick={() => handleSeatClick(seatNumber)}
        />
      );
    }
    return seats;
  };

  const totalPrice = data ? data.price * selectedSeats.length : 0;

  const handleConfirm = () => {
    console.log(selectedSeats);
    if (selectedSeats.length > 0) {
      dispatch(addSeat(selectedSeats, totalPrice));
      navigate({
        pathname: `/details/${id}`,
        search: `?&date=${searchParams.get("date")}&ticket=${[
          ...selectedSeats,
        ]}&amount=${totalPrice}`,
      });
    } else {
      error("Please select a seat first");
    }
  };

  return (
    <div className="text-center my-28 h-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Bus Seat Booking
      </h2>

      {/* Header */}
      <div className="flex justify-center mb-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full border border-gray-400 mr-2"></div>
        <span className="text-gray-600">Available</span>
        <div className="w-8 h-8 bg-green-500 rounded-full border border-green-600 mx-4"></div>
        <span className="text-gray-600">Selected</span>
        <div className="w-8 h-8 bg-gray-400 rounded-full border border-gray-500 mx-4"></div>
        <span className="text-gray-600">Booked</span>
      </div>

      <div className="text-center flex items-center justify-center w-full">
        <div className="w-1/3 flex justify-between items-center">
          <div>Total Seats: {data.totalSeat}</div>
          <div>Available Seats: {totalSeats - bookedSeatsCount}</div>
        </div>
      </div>

      <div className="lg:flex justify-center items-center">
        {/* Select Seat */}
        <div className="w-full lg:w-1/2 mt-4 flex flex-col-reverse items-center justify-end">
          <div className="lg:ml-24 flex space-x-6">
            {/* Row 1-10 */}
            <div className="w-full grid grid-rows-10 gap-x-3 mt-4">
              {renderSeat().slice(0, 10)}
            </div>
            <div className="w-full grid grid-rows-10 gap-x-3 mt-4">
              {renderSeat().slice(10, 20)}
            </div>
            <div className="w-full grid grid-rows-10 gap-x-3 mt-4">
              <div className="row-span-9"></div>
              {renderSeat().slice(20, 21)}
            </div>
            <div className="w-full grid grid-rows-10 gap-x-3 mt-4">
              {renderSeat().slice(21, 31)}
            </div>
            <div className="w-full grid grid-rows-10 gap-x-3 mt-4">
              {renderSeat().slice(31, 41)}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="w-9/12 lg:w-1/2 items-center justify-center lg:justify-start mt-12 h-full flex flex-row gap-5 flex-wrap">
          {data ? (
            <div
              key={data._id}
              className="w-8/12 p-4 shadow-2xl shadow-black rounded-lg"
            >
              <h5 className="font-semibold">
                {data.bus.companyName
                  ? data.bus.companyName
                  : "Unknown Company"}
              </h5>
              <div className="flex justify-between mt-3 mb-2 px-8">
                <p>{data.from}</p>
                <p>
                  <BiArrowFromLeft />
                </p>
                <p>{data.to}</p>
              </div>
              <div className="flex gap-2 font-light px-8">
                {/* Display amenities if any */}
                {data.bus.amenities?.map((e, i) => (
                  <div key={i}>
                    <p>{e}</p>
                  </div>
                ))}
              </div>
              <div className="text-start px-8">
                Seat no: {selectedSeats.join(", ")}
              </div>
              <hr />
              <div className="px-8 font-thin flex justify-start">
                Date: {new Date(data.date).toISOString().split("T")[0]}
              </div>
              <div className="px-8 font-thin flex justify-start">
                Arrival Time: {data.arrival}
              </div>
              <div className="px-8 font-thin flex justify-start">
                Departure Time: {data.departure}
              </div>
              <hr />
              <div className="px-8 font-thin flex justify-start">
                Email: {data.bus.email}
              </div>
              <div className="px-8 font-thin flex justify-start">
                Phone: {data.bus.phone}
              </div>
              <hr />
              <div className="flex justify-between px-10">
                <h5>Price: RS {totalPrice}</h5>
                <div className="flex justify-center pb-2">
                  {/* Display stars based on rating */}
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <AiTwotoneStar
                        key={i}
                        color={i < data.rating ? "#FFED00" : "gray"}
                      />
                    ))}
                </div>
              </div>
              <button
                onClick={handleConfirm}
                className="bg-[#1446A0] text-white rounded-lg px-4 py-2 w-1/2 mt-2"
              >
                Proceed to book
              </button>
            </div>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
