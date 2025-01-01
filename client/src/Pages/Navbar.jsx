import { useNavigate } from "react-router-dom";
import { success } from "../Utils/notification";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../Redux/authentication/auth.action";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.data.token);
  const handlelogout = () => {
    Cookies.remove("jwttoken");
    Cookies.remove("userid");
    dispatch(logoutAPI());
    navigate("/");
    success("Logout Successfully");
    };
    return (
      <nav className="navbar navbar-dark navbar-expand-lg bg-body-warning text-white bg-dark bg-opacity-25  fixed-top ">
      <div className="container-fluid">
        
      <a 
          className="navbar-brand ms-5"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <h3>
                  <span style={{ color: "#ff9c00" }}>Bus</span>Buddy
                </h3>
        </a>
        <button 
        
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav  mx-auto my-5 my-lg-auto">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Home
              </a>
            </li>
            <li className="nav-item ">
              <a
                className="nav-link active "
                style={{ cursor: "pointer", color:"#ff9c00", }}
                onClick={() => navigate("/")}
                
              > 
                Help
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link active"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/myticket`)}
              >
                My Tickets
              </a>
            </li> 

          </ul>
           

           
          <div>
            {token ? (
              <button
                className="btn btn-outline-success me-5"
                style={{
                  borderRadius: "10px",
                  border: "2px solid",
                  marginRight: "8px",
                  color: "white",
                }}
                onClick={() => handlelogout()}
              >
                Logout
              </button>
            ) : (
              <div>
                {" "}
                <button
                  className="btn me-5"
                  onClick={() => navigate("/signin")}
                  style={{
                    borderRadius: "10px",
                    border: "2px solid #ff9c00",
                    marginRight: "8px",
                    color: "#ff9c00",
                  }}
                >
                  Sign In 
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
