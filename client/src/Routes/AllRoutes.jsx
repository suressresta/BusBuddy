import Footer from "../Pages/Footer";
import Navbar from "../Pages/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import SelectBus from "../Pages/SelectBus";
import Details from "../Pages/Details";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import Myticket from "../Pages/Myticket";
import { Private } from "./Private";
import Bookseat from "../Pages/Bookseat";
import EditTicket from "../Pages/EditMyTicket";
import EditDetails from "../Pages/EditDetails";
import Payment from "../Pages/Payment";

function AllRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/selectbus" element={<SelectBus />} />
        <Route
          path="/bookticket/:id"
          element={
            <Private>
              <Bookseat />
            </Private>
          }
        />
        <Route
          path="/details/:id"
          element={
            <Private>
              <Details />
            </Private>
          }
        />
        <Route
          path="/myticket"
          element={
            <Private>
              <Myticket />
            </Private>
          }
        />
        <Route
          path="/edit_ticket/:id"
          element={
            <Private>
              <EditTicket />
            </Private>
          }
        />
        <Route
          path="/edit_details/:id"
          element={
            <Private>
              <EditDetails />
            </Private>
          }
        />
        <Route
          path="/payment"
          element={
            <Private>
              <Payment />
            </Private>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default AllRoutes;
