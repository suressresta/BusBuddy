import { applyMiddleware, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./root"; // import the rootReducer from the rootReducer.js file

const createCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  createCompose(applyMiddleware(thunk))
);
