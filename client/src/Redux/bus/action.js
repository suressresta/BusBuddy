import { ADD_BUS, VIEW_BUS, REMOVE_BUS, UPDATE_BUS } from "./actionTypes";

export const setBus = (bus) => {
  return {
    type: ADD_BUS,
    payload: bus,
  };
};

export const viewBus = (busData) => {
  return {
    type: VIEW_BUS,
    payload: busData,
  };
};

export const updateBus = (busData) => {
  return {
    type: UPDATE_BUS,
    payload: busData,
  };
};

export const DeleteBus = (busData) => {
  return {
    type: REMOVE_BUS,
    payload: busData,
  };
};
