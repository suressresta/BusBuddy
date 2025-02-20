import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export const Private = ({ children }) => {
  const { pathname, search } = useLocation();

  let url = pathname + search;
  const token = useSelector((state) => state.auth.data.token);
  const tokencookies = Cookies.get("jwttoken");
  console.log("The token is:", token);
  if (!token || tokencookies == undefined) {
    return <Navigate to={"/signin"} state={{ from: url }} replace />;
  } else {
    return children;
  }
};
