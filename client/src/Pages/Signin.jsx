import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { loginAPI } from "../Redux/authentication/auth.action";
import { error } from "../Utils/notification";

function Signin() {
  const isAuthenticated = useSelector(
    (state) => state.auth.data.isAuthenticated
  );
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (location.state && location.state.from) {
        navigate(location.state.from, { replace: true });
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated]);

  const initialData = {
    email: "",
    password: "",
  };

  const [signUpcreds, setsignUpcreds] = useState(initialData);
  const [showpassword, setshowpassword] = useState(false);

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setsignUpcreds({
      ...signUpcreds,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (signUpcreds.email === "" || signUpcreds.password === "") {
      return error("Please enter all required fields");
    }
    dispatch(loginAPI(signUpcreds, navigate));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h1>

        {/* Email Input */}
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your email address"
            value={signUpcreds.email}
            onChange={hanldeChange}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showpassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
              value={signUpcreds.password}
              onChange={hanldeChange}
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setshowpassword(!showpassword)}
            >
              {showpassword ? (
                <AiFillEye size={20} />
              ) : (
                <AiFillEyeInvisible size={20} />
              )}
            </span>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-sm text-red-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
        >
          Sign In
        </button>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-sm text-yellow-500 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
