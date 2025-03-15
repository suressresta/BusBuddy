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
import PaymentSucess from "../Pages/PaymentSucess";
import PaymentFailure from "../Pages/PaymentFailure";
import NotFoundPage from "../Pages/NotFoundPage";

function AllRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
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

          <Route path="/payment-sucess" element={<PaymentSucess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default AllRoutes;
