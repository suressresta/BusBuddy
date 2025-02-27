import "./App.css";
import AdminRoutes from "./Routes/AdminRoutes";
import AllRoutes from "./Routes/AllRoutes";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const role = Cookies.get("userRole");

  useEffect(() => {
    if (role === "admin" && !isAdminRoute) {
      navigate("/admin");
    } else if (isAdminRoute && role !== "admin") {
      navigate("/");  
    }
  }, [role, location, navigate]);

  return (
    <div className="App">
      {/* Conditionally render AllRoutes or AdminRoutes */}
      {isAdminRoute ? <AdminRoutes /> : <AllRoutes />}

      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
