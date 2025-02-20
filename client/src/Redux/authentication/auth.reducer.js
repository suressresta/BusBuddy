import Cookies from "js-cookie";
import {
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_OUT,
  AUTH_GET,
  AUTH_UPDATE,
  AUTH_DELETE,
} from "./auth.types";
import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../plugins/https";
import { deleteUser, updateUser, viewUser } from "./auth.action";

export const getUserDetails = (id) => async (dispatch) => {
  try {
    console.log("Id retrived in redux:", id);
    const res = await GetRequest(`/user/${id}`, id);
    dispatch(viewUser(res.data));
    // console.log("The user details in redux is:", res.data);
  } catch (error) {
    console.error("Error getting order:", error);
  }
};

export const updateUserDetails = (data, id) => async (dispatch) => {
  try {
    console.log("The user details in redux is:", data, id);

    const res = await PutRequest(`/user/${id}`, data);
    dispatch(updateUser(res.data));
    dispatch(getUserDetails(id));
    // console.log("The user details in redux is:", res.data);
  } catch (error) {
    throw error;
  }
};

export const deleteUserDetails = (id) => async (dispatch) => {
  try {
    const res = await DeleteRequest(`/user/${id}`);
    dispatch(deleteUser(res.data));
    // dispatch(getUserDetails());
  } catch (error) {
    console.error("Error getting order:", error);
  }
};

export const authInitalState = {
  loading: false,
  data: {
    token: Cookies.get("jwttoken") || "",
    userid: Cookies.get("userid") || "",
    isAuthenticated: false,
  },
  error: false,
  user: [],
};

export const authReducer = (state = authInitalState, action) => {
  switch (action.type) {
    case AUTH_LOG_IN_SUCCESS: {
      // console.log("logged in successfully");
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          token: Cookies.get("jwttoken"),
          userid: Cookies.get("userid"),
          isAuthenticated: true,
        },
      };
    }
    case AUTH_LOG_IN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case AUTH_LOG_OUT: {
      return {
        ...state,
        data: {
          ...state.data,
          token: "",
          role: "",
          userid: "",
          isAuthenticated: false,
        },
      };
    }
    case AUTH_GET: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case AUTH_UPDATE:
      return {
        ...state,
        user: action.payload,
      };

    case AUTH_DELETE: {
      return {
        ...state,
        user: state.user.filter((user) => user._id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};
