import { combineReducers } from "redux";
import { authReducer } from "../authentication/auth.reducer";
import { filterReducer } from "../filter/filter.reducer";
import { ticketReducer } from "../ticket/ticket.reducer";
import { busReducer } from "../bus/reducer";
import { orderReducer } from "../order/reducer";
import { routeReducer } from "../route/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  ticket: ticketReducer,
  bus: busReducer,
  order: orderReducer,
  route: routeReducer,
});
