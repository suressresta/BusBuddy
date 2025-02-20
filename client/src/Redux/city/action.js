import { ADD_BUS, VIEW_CITY, REMOVE_BUS, UPDATE_BUS } from "./actionTypes";

export const viewCity = (cityData) => {
  return {
    type: VIEW_CITY,
    payload: cityData,
  };
};

// export const setBus = (bus) => {
//   return {
//     type: ADD_BUS,
//     payload: bus,
//   };
// };

// export const updateBus = (busData) => {
//   return {
//     type: UPDATE_BUS,
//     payload: busData,
//   };
// };

// export const DeleteBus = (busData) => {
//   return {
//     type: REMOVE_BUS,
//     payload: busData,
//   };
// };
