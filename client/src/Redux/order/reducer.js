import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../plugins/https";
import {
  deleteOrderData,
  setOneOrder,
  setOrder,
  setPastOrder,
  setTodayOrder,
  setUpcommingOrder,
  updateOrder,
  viewOrder,
  viewOrderById,
  viewSeat,
} from "./action";
import {
  ADD_ORDER,
  VIEW_ORDER,
  REMOVE_ORDER,
  UPDATE_ORDER,
  SEAT_SELECTED,
  SEAT_CLEARED,
  VIEW_SEAT,
  TODAY_ORDER,
  UPCOMMING_ORDER,
  PAST_ORDER,
  VIEW_ORDERBYID,
} from "./actionTypes";

export const getOrder = () => async (dispatch) => {
  try {
    const res = await GetRequest("/order");
    dispatch(viewOrder(res.data));
  } catch (error) {
    console.error("Error getting order:", error);
  }
};

export const getOrderById = (id) => async (dispatch) => {
  try {
    console.log("The id in redux", id);
    const res = await GetRequest(`/order/${id}`);
    dispatch(viewOrderById(res.data));
    // dispatch();
  } catch (error) {
    console.error("Error getting order:", error);
  }
};

export const addOrder = (order) => async (dispatch) => {
  try {
    const res = await PostRequest("/order", order);
    console.log("The order data in redux are:", res);
    dispatch(setOrder(res));
    dispatch(setOneOrder(res));
    dispatch(getOrder());
  } catch (error) {
    console.error(error);
  }
};

export const getOrderSeat = (id) => async (dispatch) => {
  try {
    const res = await GetRequest(`/order/seat/${id}`);
    dispatch(viewSeat(res.data));
  } catch (error) {
    console.error("Error getting order seat:", error);
  }
};

export const getTodayOrder = (userId) => async (dispatch) => {
  try {
    const res = await PostRequest(`/order/myticket/today`, {
      userId: userId,
    });
    console.log("The data retrived in redux are:", res.data);
    dispatch(setTodayOrder(res.data));
  } catch (error) {
    console.error("Error getting today order ");
  }
};
export const getUpcommingOrder = (userId) => async (dispatch) => {
  try {
    const res = await PostRequest(`/order/myticket/upcoming`, {
      userId: userId,
    });

    dispatch(setUpcommingOrder(res.data));
  } catch (error) {
    console.error("Error getting upcoming order:");
  }
};

export const getPastOrder = (userId) => async (dispatch) => {
  try {
    const res = await PostRequest(`/order/myticket/past`, {
      userId: userId,
    });
    dispatch(setPastOrder(res.data));
  } catch (error) {
    console.error("Error getting past order:");
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    console.log("The id in reedux :", id);
    const res = await DeleteRequest(`/order/${id}`);
    if (res.status === "success") {
      dispatch(deleteOrderData(id));
    }
  } catch (error) {
    console.error("Error deleting bus:", error);
  }
};

export const updateOrderData = (updatingOrder, id) => async (dispatch) => {
  try {
    console.log("Updating data are:", updatingOrder);
    console.log("Updating data id are:", id);
    const res = await PutRequest(`/order/${id}`, updatingOrder);
    dispatch(updateOrder(res.data));
    dispatch(getOrder());
    dispatch(getTodayOrder());
    dispatch(getUpcommingOrder());
    dispatch(getPastOrder());
  } catch (error) {
    console.error("Error updating Bus Data:", error);
  }
};

const initialState = {
  setData: "",
  orderData: [],
  orderDatabyId: "",
  seatOrder: [],
  todayOrder: [],
  upCommingOrder: [],
  pastOrder: [],
  seats: [],
  totalPrice: 0,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORDER":
      return {
        ...state,
        setData: action.payload,
      };
    case ADD_ORDER:
      return {
        ...state,
        orderData: [...state.orderData, action.payload],
      };
    case TODAY_ORDER:
      return {
        ...state,
        todayOrder: action.payload,
      };
    case UPCOMMING_ORDER:
      return {
        ...state,
        upCommingOrder: action.payload,
      };
    case PAST_ORDER:
      return {
        ...state,
        pastOrder: action.payload,
      };
    case VIEW_ORDER:
      return {
        ...state,
        orderData: action.payload,
      };
    case VIEW_ORDERBYID:
      return {
        ...state,
        orderDatabyId: action.payload,
      };
    case VIEW_SEAT:
      return {
        ...state,
        seatOrder: action.payload,
      };
    case SEAT_SELECTED:
      return {
        ...state,
        seats: action.payload.selectedSeats,
        totalPrice: action.payload.totalPrice,
      };
    case SEAT_CLEARED:
      return {
        ...state,
        seats: [],
        totalPrice: 0,
      };
    case REMOVE_ORDER:
      return {
        ...state,
        orderData: state.todayOrder.filter(
          (order) => order._id !== action.payload
        ),

        todayOrder: state.todayOrder.filter(
          (order) => order._id !== action.payload
        ),
        upCommingOrder: state.upCommingOrder.filter(
          (order) => order._id !== action.payload
        ),
        pastOrder: state.pastOrder.filter(
          (order) => order._id !== action.payload
        ),
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orderData: state.orderData.map(
          (order) => (order._id === action.payload._id ? action.payload : order) // Update only the matched order
        ),
      };
    default:
      return state;
  }
};
