import "./App.css";
import AdminRoutes from "./Routes/AdminRoutes";
import AllRoutes from "./Routes/AllRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <AllRoutes />
      <ToastContainer autoClose={3000} />
      <AdminRoutes />
    </div>
  );
}

export default App;
