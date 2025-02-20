import {
  ADD_ROUTE,
  REMOVE_ROUTE,
  VIEW_ROUTE,
  UPDATE_ROUTE,
  VIEW_ROUTEID,
} from "./actionTypes";

export const setRoute = (routeData) => {
  return {
    type: ADD_ROUTE,
    payload: routeData,
  };
};

export const viewRoute = (route) => {
  return {
    type: VIEW_ROUTE,
    payload: route,
  };
};

export const viewRouteId = (data) => {
  return {
    type: VIEW_ROUTEID,
    payload: data,
  };
};

export const updateRoute = (routeData) => {
  return {
    type: UPDATE_ROUTE,
    payload: routeData,
  };
};

export const removeRoute = (routeData) => {
  return {
    type: REMOVE_ROUTE,
    payload: routeData,
  };
};
