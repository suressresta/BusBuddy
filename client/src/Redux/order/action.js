import {
  ADD_ORDER,
  VIEW_ORDER,
  REMOVE_ORDER,
  UPDATE_ORDER,
  SEAT_SELECTED,
  SEAT_CLEARED,
  VIEW_SEAT,
  TODAY_ORDER,
  PAST_ORDER,
  UPCOMMING_ORDER,
  VIEW_ORDERBYID,
} from "./actionTypes";

export const setOrder = (order) => {
  return {
    type: ADD_ORDER,
    payload: order,
  };
};

export const setTodayOrder = (todayOrder) => {
  return {
    type: TODAY_ORDER,
    payload: todayOrder,
  };
};
export const setPastOrder = (pastOrder) => {
  return {
    type: PAST_ORDER,
    payload: pastOrder,
  };
};
export const setUpcommingOrder = (upCommingOrder) => {
  return {
    type: UPCOMMING_ORDER,
    payload: upCommingOrder,
  };
};

export const viewOrder = (orderData) => {
  return {
    type: VIEW_ORDER,
    payload: orderData,
  };
};

export const viewOrderById = (orderData) => {
  return {
    type: VIEW_ORDERBYID,
    payload: orderData,
  };
};

export const viewSeat = (seatOrder) => {
  return {
    type: VIEW_SEAT,
    payload: seatOrder,
  };
};

export const updateOrder = (orderData) => {
  return {
    type: UPDATE_ORDER,
    payload: orderData,
  };
};

export const deleteOrderData = (id) => {
  return {
    type: REMOVE_ORDER,
    payload: id,
  };
};

export const addSeat = (selectedSeats, totalPrice) => {
  return {
    type: SEAT_SELECTED,
    payload: { selectedSeats, totalPrice },
  };
};
export const clearSeat = (seat) => {
  return {
    type: SEAT_CLEARED,
    payload: null,
  };
};
