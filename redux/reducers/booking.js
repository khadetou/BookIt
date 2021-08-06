import {
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_SUCCESS,
  FORGOT_PASS_SUCCESS,
} from "../types/type";

const initialState = {
  available: null,
  loading: true,
  error: null,
};

export const booking = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case CHECK_BOOKING_SUCCESS:
      return {
        ...state,
        available: payload,
        loading: false,
      };
    case CHECK_BOOKING_FAIL: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }

    case CHECK_BOOKING_RESET: {
      return {
        ...state,
        available: null,
        loading: false,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
