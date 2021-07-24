import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import reactReducer from "./reducers";
import thunk from "redux-thunk";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");

    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === HYDRATE) {
    const nextState = {
      ...state,
      ...payload,
    };
    return nextState;
  } else {
    return reactReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunk]));
};

export const wrapper = createWrapper(initStore);
