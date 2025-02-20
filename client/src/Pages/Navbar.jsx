import { useNavigate } from "react-router-dom";
import { success } from "../Utils/notification";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../Redux/authentication/auth.action";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { getUserDetails } from "../Redux/authentication/auth.reducer";
import ProfileModal from "../Components/showModal/ProfileModal";
import PasswordResetModal from "../Components/showModal/PasswordResetModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.data.token);

  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const handleLogout = () => {
    Cookies.remove("jwttoken");
    Cookies.remove("userid");
    Cookies.remove("userRole");
    dispatch(logoutAPI());
    navigate("/");
    success("Logout Successfully");
  };

  const openModal = () => {
    setIsModalOpen(true);
    const id = Cookies.get("userid");
    if (id) {
      dispatch(getUserDetails(id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openPasswordEditModal = () => {
    setIsPassword(true);
  };
  const closePasswordEditModal = () => {
    setIsPassword(false);
  };

  const getUser = useSelector((state) => state.auth.user);

  return (
    <nav className="bg-dark bg-opacity-25 fixed top-0 left-0 w-full shadow-md z-10">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <a
          className="text-2xl font-bold cursor-pointer no-underline text-white hover:text-yellow-400"
          onClick={() => navigate("/")}
        >
          <span className="text-yellow-400">Bus</span>Buddy
        </a>

        {/* Navbar toggler for mobile */}
        <button
          className="lg:hidden text-white no-underline focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="text-white">☰</span>
        </button>

        {/* Navbar Links (Desktop) */}
        <div className="lg:flex hidden space-x-8 items-center">
          <a
            className="text-white no-underline text-lg hover:text-yellow-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </a>
          <a
            className="text-white no-underline text-lg hover:text-yellow-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Help
          </a>
          <a
            className="text-white no-underline text-lg hover:text-yellow-400 cursor-pointer"
            onClick={() => navigate("/myticket")}
          >
            My Tickets
          </a>
        </div>

        {/* Authentication Button */}
        <div className="flex items-center">
          {token ? (
            <div className=" gap-16 flex items-center justify-between">
              <button
                className="bg-transparent border-2 border-yellow-400 text-white no-underline px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
                onClick={handleLogout}
              >
                Logout
              </button>
              <div
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                className="relative hover:scale-110 duration-300 text-white font-semibold border-2 border-yellow-400 bg-transparent cursor-pointer  px-3.5 py-3.5 rounded-full"
              >
                <div className="text-xl font-semibold ">
                  <FaRegUser className="text-white" />
                </div>
                {isDropdownOpen && (
                  <div className="absolute top-10 left-2 pt-3 px-4  rounded z-10">
                    <div className="bg-dark bg-opacity-25 text-white rounded-md shadow-lg">
                      <div
                        // onClick={handleProfile}
                        onClick={openModal}
                        className="block px-4 py-2  hover:font-semibold hover:scale-110 duration-300"
                      >
                        Profile
                      </div>
                      <div
                        onClick={openPasswordEditModal}
                        className="block px-4 py-2  hover:font-semibold hover:scale-110 duration-300"
                      >
                        Password
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={` lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } py-4 space-y-4`}
      >
        <ul className="flex flex-col items-center  space-y-4">
          <li className="">
            <a
              className="no-underline  text-white text-lg hover:text-yellow-400"
              onClick={() => navigate("/")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="text-white no-underline text-lg hover:text-yellow-400"
              onClick={() => navigate("/")}
            >
              Help
            </a>
          </li>
          <li>
            <a
              className="text-white text-lg no-underline hover:text-yellow-400"
              onClick={() => navigate("/myticket")}
            >
              My Tickets
            </a>
          </li>
        </ul>
      </div>

      {/* Modal for Profile */}
      {isModalOpen && <ProfileModal user={getUser} closeModal={closeModal} />}
      {isPassword && (
        <PasswordResetModal
          user={Cookies.get("userid")}
          closePasswordEditModal={closePasswordEditModal}
        />
      )}
    </nav>
  );
};

export default Navbar;
