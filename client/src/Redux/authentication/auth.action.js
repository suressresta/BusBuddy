import {
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_OUT,
  AUTH_GET,
  AUTH_UPDATE,
  AUTH_DELETE,
} from "./auth.types";
import axios from "axios";
import Cookies from "js-cookie";
import { unsucess, success } from "../../Utils/notification";

// Login API
export const loginAPI = (data, navigate) => async (dispatch) => {
  try {
    let response = await axios.post("http://localhost:8080/user/login", data);

    if (response.data.status === "Failed") {
      unsucess(response.data.message);
    } else {
      const user = response.data.message.user;
      const token = response.data.message.token;

      // Save user token and ID to Cookies
      Cookies.set("jwttoken", token, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour expiration
      });
      Cookies.set("userid", user.id, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      });
      Cookies.set("userRole", user.role, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      });
      success("Logged in successfully");
      // Dispatch login success action with user data and token
      dispatch({
        type: AUTH_LOG_IN_SUCCESS,
        payload: { user, token },
      });
    }
  } catch (error) {
    dispatch({
      type: AUTH_LOG_IN_ERROR,
    });
    // console.log(error);
    unsucess("Something went wrong. Please try again.");
  }
};

// Logout API
export const logoutAPI = () => (dispatch) => {
  // Clear cookies on logout
  Cookies.remove("jwttoken");
  Cookies.remove("userid");
  Cookies.remove("userRole");

  dispatch({
    type: AUTH_LOG_OUT,
  });
};

export const viewUser = (user) => {
  return {
    type: AUTH_GET,
    payload: user,
  };
};
export const updateUser = (user) => {
  return {
    type: AUTH_UPDATE,
    payload: user,
  };
};
export const deleteUser = (user) => {
  return {
    type: AUTH_DELETE,
    payload: user,
  };
};
