import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "../Styles/details.module.css";
import { validateEmail, validateMobile } from "../Utils/formValidator";
import { error, success } from "../Utils/notification";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
// import { orderDatabyId } from "../Redux/order/reducer";
import { clearSeat } from "../Redux/order/action";
import { updateOrderData } from "../Redux/order/reducer";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const order = useSelector((state) => state.order.orderDatabyId);
  const initialData = {
    name: order.userDetails.name,
    age: order.userDetails.age,
    gender: order.userDetails.gender,
    email: order.userDetails.email,
    phone: order.userDetails.phone,
  };

  const [creds, setcreds] = useState(initialData);

  function hanldeChange(e) {
    setcreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  }

  const amount = useSelector((state) => state.order.totalPrice);
  const seat = useSelector((state) => state.order.seats);

  async function handleclick(e) {
    e.preventDefault();
    let id = params.id;
    if (
      creds.name === "" ||
      creds.age === "" ||
      creds.gender === "" ||
      creds.email === "" ||
      creds.phone === ""
    ) {
      return error("Please fill all details");
    }

    const isEmail = validateEmail(creds.email);
    if (!isEmail.status) {
      return error(isEmail.message);
    }

    const isMobile = validateMobile(creds.phone);
    if (!isMobile.status) {
      return error(isMobile.message);
    }
    if (amount <= 0) {
      alert("Please Try Again");
      navigate(-1); // Navigate back to the previous page
      return; // Prevent further execution if the amount is invalid
    }
    // Prepare the data to send in the POST request
    const orderData = {
      userDetails: {
        name: creds.name,
        age: creds.age,
        gender: creds.gender,
        email: creds.email,
        phone: creds.phone,
      },
      totalAmount: amount,
      seatNumber: seat,
    };

    try {
      dispatch(updateOrderData(orderData, id));
      dispatch(clearSeat());
      navigate("/myticket");
      success("Ticket booked successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again.");
    }
  }

  return (
    <div className={styles.details}>
      <form onSubmit={(e) => handleclick(e)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            name="name"
            value={creds.name}
            onChange={hanldeChange}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            name="age"
            value={creds.age}
            onChange={hanldeChange}
            type="number"
            className="form-control"
          />
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            name="gender"
            onChange={hanldeChange}
          >
            <option value="">Select Your Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
          <label htmlFor="floatingSelect">Gender</label>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={creds.email}
            onChange={hanldeChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone No
          </label>
          <input
            name="phone"
            value={creds.phone}
            onChange={hanldeChange}
            type="number"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Details;
