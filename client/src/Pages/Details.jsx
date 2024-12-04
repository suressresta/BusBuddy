import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "../Styles/details.module.css";
import { validateEmail, validateMobile } from "../Utils/formValidator";
import { error } from "../Utils/notification";
import Cookies from "js-cookie";
import axios from "axios";

function Details() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const initialData = {
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
  };
  const [creds, setcreds] = useState(initialData);

  function hanldeChange(e) {
    setcreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  }

  async function handleclick(e) {
    e.preventDefault();
    let busid = params.id;
    let date = searchParams.get("date");
    let ticket = searchParams.get("ticket");
    let amount = searchParams.get("amount");
    let token = Cookies.get("jwttoken");
    let userid = Cookies.get("userid");

    // Validation checks
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

    try {
      const { data } = await axios.post("http://localhost:8080/order", {
        busid,
        date,
        ticket,
        amount,
        user: creds,
        token,
        userid,
      });

      if (data.success) {
        // On successful booking, navigate to the confirmation page
        navigate("/booking-confirmation"); // Adjust to your desired confirmation route
      } else {
        error("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      error("Something went wrong, please try again.");
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
            <option selected>Select Your Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
          <label htmlFor="floatingSelect">Gender</label>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={hanldeChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone No
          </label>
          <input
            name="phone"
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
}

export default Details;
