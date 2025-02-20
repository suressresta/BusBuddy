import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../plugins/https";
import { DeleteBus, setBus, updateBus, viewCity } from "./action";
import { ADD_BUS, VIEW_CITY, REMOVE_BUS, UPDATE_BUS } from "./actionTypes";

export const getCity = () => async (dispatch) => {
  try {
    const res = await GetRequest("/city");
    dispatch(viewCity(res.data));
    // console.log("The res",res.data);
  } catch (error) {
    console.error("Error getting bus:", error);
  }
};

// export const addBus = (bus) => async (dispatch) => {
//   try {
//     const res = await PostRequest("/bus", bus);
//     dispatch(setBus(res.data));
//     dispatch(getBus());
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const deleteBus = (id) => async (dispatch) => {
//   try {
//     const res = await DeleteRequest(`/bus/${id}`);
//     if (res.status === "success") {
//       dispatch(DeleteBus(id));
//       dispatch(getBus());
//     }
//   } catch (error) {
//     console.error("Error deleting bus:", error);
//   }
// };

// export const updateBusData = (updatingBus, busId) => async (dispatch) => {
//   try {
//     const res = await PutRequest(`/bus/${busId}`, updatingBus);
//     dispatch(updateBus(res.data));
//     dispatch(getBus());
//   } catch (error) {
//     console.error("Error updating Bus Data:", error);
//   }
// };

const initialState = { cityData: [], bus: "" };

export const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_BUS:
      return {
        ...state,
        cityData: action.payload,
      };
    // case ADD_BUS:
    //   return {
    //     ...state,
    //     busData: [...state.busData, action.payload],
    //   };

    
    // case REMOVE_BUS:
    //   return {
    //     ...state,
    //     busData: state.busData.filter((bus) => bus._id !== action.payload),
    //   };

    // case UPDATE_BUS:
    //   return {
    //     ...state,
    //     busData: state.busData.map((bus) =>
    //       bus._id === action.payload._id ? action.payload : bus
    //     ),
    //   };

    default:
      return state;
  }
};
