import { combineReducers } from "redux";
import { authReducer } from "../authentication/auth.reducer";
import { filterReducer } from "../filter/filter.reducer";
import { ticketReducer } from "../ticket/ticket.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  ticket: ticketReducer,
});
