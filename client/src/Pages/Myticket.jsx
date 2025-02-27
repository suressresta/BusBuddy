import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { success } from "../Utils/notification";
import { BiArrowFromLeft } from "react-icons/bi";
import {
  deleteOrder,
  getOrderById,
  getPastOrder,
  getTodayOrder,
  getUpcommingOrder,
} from "../Redux/order/reducer";
import { AiTwotoneStar } from "react-icons/ai";

function Myticket() {
  const [data, setdata] = useState([]);
  const [past, setPast] = useState([]);
  const [today, setToday] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todayData = useSelector((state) => state.order.todayOrder);
  const UpcommingData = useSelector((state) => state.order.upCommingOrder);
  const pastData = useSelector((state) => state.order.pastOrder);

  async function handledelete(ele) {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this ticket?"
    );
    if (confirmDelete) {
      try {
        dispatch(deleteOrder(ele._id));
        success("Ticket Cancelled Successfully");

        // Optimistically update the state to remove the deleted ticket
        setToday((prev) => prev.filter((item) => item._id !== ele._id));
        setUpcoming((prev) => prev.filter((item) => item._id !== ele._id));
        setPast((prev) => prev.filter((item) => item._id !== ele._id));
      } catch (error) {
        error("Error deleting ticket: " + error.message);
      }
    }
  }

  const handleEdit = (ele) => {
    const id = ele._id;
    console.log(id);
    const journeyDate = new Date(ele.route.date)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");

    navigate(`/edit_ticket/${id}?date=${journeyDate}`);
  };

  // Effect to dispatch data fetching when component mounts
  useEffect(() => {
    const userId = Cookies.get("userid");
    if (userId) {
      dispatch(getTodayOrder(userId));
      dispatch(getUpcommingOrder(userId));
      dispatch(getPastOrder(userId));
    }
  }, []);

  // Effect to update states from Redux store when the store data changes
  useEffect(() => {
    setToday(todayData);
    setUpcoming(UpcommingData);
    setPast(pastData);
  }, [todayData, UpcommingData, pastData]);

  return (
    <div className="my-[11%] h-screen">
      <nav className="">
        {/* Buttons */}
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Today's Tickets
          </button>
          <button
            className="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Upcoming Tickets
          </button>
          <button
            className="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Past Tickets
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        {/* Today's Tickets */}
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <div className="flex items-center justify-center m-4 h-full">
            {today?.length === 0 ? (
              <p>No Tickets for Today.</p>
            ) : (
              today?.map((ele) => (
                <div
                  key={ele._id}
                  className="w-1/3 mx-4 p-4 shadow-lg shadow-black   rounded-lg"
                >
                  <h5 className="text-xl font-semibold">
                    {ele?.route?.bus?.companyName} Travels
                  </h5>
                  <div className="flex justify-between  mt-3 mb-2 px-8">
                    <p>{ele?.route?.from}</p>
                    <p>
                      <BiArrowFromLeft />
                    </p>
                    <p>{ele?.route?.to}</p>
                  </div>
                  <hr />

                  <div className="text-start pt-2  px-8">
                    Seat no : {ele?.seatNumber.join(", ")}
                  </div>

                  <div className="text-start px-8 pb-2">
                    Booking Date :{" "}
                    {new Date(ele?.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <hr className="my-2" />

                  <div className="text-start font-light px-8 pt-2">
                    Date Of Journey:{" "}
                    {new Date(ele?.route?.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-start px-8  font-light">
                    Arrival Time: {ele?.route?.arrival}
                  </div>
                  <div className="text-start px-8 font-light pb-2">
                    Departure Time: {ele?.route?.departure}
                  </div>
                  <hr className="my-2" />

                  <div className="text-start px-8  font-light pt-2">
                    Email: {ele?.route?.bus?.email}
                  </div>
                  <div className="text-start px-8  font-light">
                    Phone: {ele?.route?.bus?.phone}
                  </div>
                  <div className=" flex px-8 font-light ">
                    <div className="flex start gap-2">
                      Amenities:
                      {ele?.route?.bus.amenities?.map((e, i) => (
                        <div key={i}>
                          <p>{e}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="my-2" />

                  <div className="flex justify-between items-center px-8 mt-2 gap-2">
                    <div className=" gap-2">
                      <h5 className="text-lg font-semibold">
                        Total amount : RS {ele?.totalAmount}
                      </h5>
                    </div>
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
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Tickets */}
        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <div className="flex items-center justify-center m-4 h-full overflow-y-auto p-4 border-4">
            {upcoming?.length === 0 ? (
              <p>No Upcoming Tickets.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-h-[80vh] overflow-y-auto">
                {upcoming?.map((ele) => (
                  <div
                    key={ele._id}
                    className="p-4 shadow-lg shadow-black rounded-lg"
                  >
                    <h5 className="text-xl font-semibold">
                      {ele?.route?.bus?.companyName} Travels
                    </h5>
                    <div className="flex justify-between mt-3 mb-2 px-8">
                      <p>{ele?.route?.from}</p>
                      <p>
                        <BiArrowFromLeft />
                      </p>
                      <p>{ele?.route?.to}</p>
                    </div>
                    <hr />

                    <div className="text-start pt-2 px-8">
                      Seat no: {ele?.seatNumber.join(", ")}
                    </div>

                    <div className="text-start px-8 pb-2">
                      Booking Date:{" "}
                      {new Date(ele?.createdAt).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <hr className="my-2" />

                    <div className="text-start font-light px-8 pt-2">
                      Date Of Journey:{" "}
                      {new Date(ele?.route?.date).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-start px-8 font-light">
                      Arrival Time: {ele?.route?.arrival}
                    </div>
                    <div className="text-start px-8 font-light pb-2">
                      Departure Time: {ele?.route?.departure}
                    </div>
                    <hr className="my-2" />

                    <div className="text-start px-8 font-light pt-2">
                      Email: {ele?.route?.bus?.email}
                    </div>
                    <div className="text-start px-8 font-light">
                      Phone: {ele?.route?.bus?.phone}
                    </div>
                    <div className="flex px-8 font-light">
                      <div className="flex start gap-2">
                        Amenities:
                        {ele?.route?.bus.amenities?.map((e, i) => (
                          <div key={i}>
                            <p>{e}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <hr className="my-2" />

                    <div className="flex justify-between items-center px-8 mt-2 gap-2">
                      <div className="gap-2">
                        <h5 className="text-lg font-semibold">
                          Total amount: RS {ele?.totalAmount}
                        </h5>
                      </div>
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

                    <div className="flex justify-between gap-2 mt-2">
                      <button
                        className="bg-yellow-600 text-white rounded-lg px-4 py-2 w-1/3"
                        onClick={() => handleEdit(ele)}
                      >
                        Edit Ticket
                      </button>

                      <button
                        className="bg-[#1446A0] text-white rounded-lg px-4 py-2 w-1/3"
                        onClick={() => handledelete(ele)}
                      >
                        Cancel Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Past Tickets */}
        <div
          className="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <div className="flex items-center justify-center m-4 h-full">
            {past?.length === 0 ? (
              <p>No Past Tickets.</p>
            ) : (
              past?.map((ele) => (
                <div
                  key={ele._id}
                  className="w-1/3 mx-4 p-4 shadow-lg shadow-black   rounded-lg"
                >
                  <h5 className="text-xl font-semibold">
                    {ele?.route?.bus?.companyName} Travels
                  </h5>
                  <div className="flex justify-between  mt-3 mb-2 px-8">
                    <p>{ele?.route?.from}</p>
                    <p>
                      <BiArrowFromLeft />
                    </p>
                    <p>{ele?.route?.to}</p>
                  </div>
                  <hr />

                  <div className="text-start pt-2  px-8">
                    Seat no : {ele?.seatNumber.join(", ")}
                  </div>

                  <div className="text-start px-8 pb-2">
                    Booking Date :{" "}
                    {new Date(ele?.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <hr className="my-2" />

                  <div className="text-start font-light px-8 pt-2">
                    Date Of Journey:{" "}
                    {new Date(ele?.route?.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-start px-8  font-light">
                    Arrival Time: {ele?.route?.arrival}
                  </div>
                  <div className="text-start px-8 font-light pb-2">
                    Departure Time: {ele?.route?.departure}
                  </div>
                  <hr className="my-2" />

                  <div className="text-start px-8  font-light pt-2">
                    Email: {ele?.route?.bus?.email}
                  </div>
                  <div className="text-start px-8  font-light">
                    Phone: {ele?.route?.bus?.phone}
                  </div>
                  <div className=" flex px-8 font-light ">
                    <div className="flex start gap-2">
                      Amenities:
                      {ele?.route?.bus.amenities?.map((e, i) => (
                        <div key={i}>
                          <p>{e}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="my-2" />

                  <div className="flex justify-between items-center px-8 mt-2 gap-2">
                    <div className=" gap-2">
                      <h5 className="text-lg font-semibold">
                        Total amount : RS {ele?.totalAmount}
                      </h5>
                    </div>
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myticket;
