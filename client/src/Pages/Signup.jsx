import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/login.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { error, success } from "../Utils/notification";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

function Signup() {
  const initialData = {
    email: "",
    password: "",
    gender: "",
  };
  const [signUpcreds, setsignUpcreds] = useState(initialData);
  const [showpassword, setshowpassword] = useState(false);
  const navigate = useNavigate();

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setsignUpcreds({
      ...signUpcreds,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      signUpcreds.email === "" ||
      signUpcreds.password === "" ||
      signUpcreds.gender === ""
    ) {
      error("Please Fill All The Details");
      return;
    }

    try {
      let response = await axios.post(
        "http://localhost:8080/user/signup",
        signUpcreds
      );

      if (response.data.status === "Failed") {
        error(response.data.message);
        toast.error("Try again later");
      } else {
        navigate("/signin");
        success("Signup Successful, please login.");
      }
    } catch (error) {
      toast.error(
        "This email is already in use. Please try with a different email."
      );
    }
  };

  return (
    <>
      <div className={styles.login}>
        <h1 className="h3 mb-3 fw-bold">Sign Up</h1>
        <div>
          <p style={{ textAlign: "left", marginBottom: "0px" }}>Email</p>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email address"
            name="email"
            value={signUpcreds.email}
            onChange={hanldeChange}
          />
        </div>
        <p style={{ textAlign: "left", marginBottom: "0px" }}>Password</p>
        <div className="form-floating">
          <div className="input-group mb-3">
            <input
              type={showpassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Your Password"
              name="password"
              value={signUpcreds.password}
              onChange={hanldeChange}
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setshowpassword(!showpassword)}
            >
              {showpassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
        </div>
        <select
          name={"gender"}
          value={signUpcreds.gender}
          onChange={hanldeChange}
          className="form-select"
          aria-label="Default select example"
        >
          <option value="">Select Your Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button
          className="w-100 mt-3 btn btn-lg bg-dark text-white"
          onClick={handleSubmit}
        >
          Sign up
        </button>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <p>
            Already A User?{" "}
            <Link
              to="/signin"
              style={{
                paddingLeft: 8,
                textDecoration: "none",
                color: "red",
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
