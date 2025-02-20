import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../plugins/https";
import {
  setRoute,
  viewRoute,
  removeRoute,
  updateRoute,
  viewRouteId,
} from "./action";
import {
  ADD_ROUTE,
  REMOVE_ROUTE,
  VIEW_ROUTE,
  UPDATE_ROUTE,
  VIEW_ROUTEID,
} from "./actionTypes";

export const getRoute = () => async (dispatch) => {
  try {
    const res = await GetRequest("/route");
    dispatch(viewRoute(res.data));
    // console.log("The res",res.data);
  } catch (error) {
    console.error("Error getting bus:", error);
  }
};

export const getRouteId = (id) => async (dispatch) => {
  try {
    // console.log("The id send:", id);
    const res = await GetRequest(`/route/${id}`);
    // console.log("The data from Redux", res.data);
    dispatch(viewRouteId(res.data));
  } catch (error) {
    console.error("Error getting bus:", error);
  }
};

export const addRoute = (routeData) => async (dispatch) => {
  try {
    const res = await PostRequest("/route", routeData);
    console.log("Route added successfully:", res);
    dispatch(setRoute(res.data));
    dispatch(getRoute());
  } catch (error) {
    console.error("Error adding route:", error.response || error);
  }
};

export const deleteRoute = (id) => async (dispatch) => {
  try {
    const res = await DeleteRequest(`/route/${id}`);
    if (res.status === "success") {
      dispatch(removeRoute(id));
      dispatch(getRoute());
    }
  } catch (error) {
    console.error("Error deleting route:", error);
  }
};

export const updateRouteData = (updatingRoute, routeId) => async (dispatch) => {
  try {
    const res = await PutRequest(`/route/${routeId}`, updatingRoute);
    dispatch(updateRoute(res.data));
    dispatch(getRoute());
  } catch (error) {
    console.error("Error updating Route Data:", error);
  }
};

const initialState = { routeData: [], route: {} };

export const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROUTE:
      return {
        ...state,
        routeData: [...state.routeData, action.payload],
      };

    case VIEW_ROUTE:
      return {
        ...state,
        routeData: action.payload,
      };

    case VIEW_ROUTEID:
      return {
        ...state,
        route: action.payload,
      };

    case REMOVE_ROUTE:
      return {
        ...state,
        routeData: state.routeData.filter(
          (route) => route._id !== action.payload
        ),
      };

    case UPDATE_ROUTE:
      return {
        ...state,
        routeData: state.routeData.map((route) =>
          route._id === action.payload._id ? action.payload : route
        ),
      };

    default:
      return state;
  }
};
