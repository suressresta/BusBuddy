import { useNavigate } from "react-router-dom";
import { success } from "../Utils/notification";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../Redux/authentication/auth.action";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.data.token);

  const handleLogout = () => {
    Cookies.remove("jwttoken");
    Cookies.remove("userid");
    dispatch(logoutAPI());
    navigate("/");
    success("Logout Successfully");
  };

  return (
    <nav className="bg-gray-800 bg-opacity-25 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-white text-2xl font-bold no-underline">
          <h3>
            <span className="text-orange-500 ">Bus</span>Buddy
          </h3>
        </a>
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() =>
            document.getElementById("navbar-menu").classList.toggle("hidden")
          }
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div id="navbar-menu" className="hidden md:flex space-x-6 items-center">
          <a
            href="/"
            className="text-white text-lg font-semibold hover:text-orange-500 no-underline"
          >
            Home
          </a>
          <a
            href="/help"
            className="text-white text-lg font-semibold hover:text-orange-500 no-underline"
          >
            Help
          </a>
          <a
            href="/myticket"
            className="text-white text-lg font-semibold hover:text-orange-500 no-underline"
          >
            My Tickets
          </a>
        </div>
        <div>
          {token ? (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <a
              href="/signin"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 no-underline"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
