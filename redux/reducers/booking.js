import {
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_SUCCESS,
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_FAIL,
} from "../types/type";

const initialState = {
  available: null,
  loading: true,
  error: null,
  dates: null,
  bookings: null,
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

    case GET_BOOKINGS_SUCCESS: {
      return {
        ...state,
        bookings: payload,
        loading: false,
      };
    }
    case BOOKED_DATES_SUCCESS: {
      return {
        ...state,
        dates: payload,
        loading: false,
      };
    }

    case GET_BOOKINGS_FAIL:
    case BOOKED_DATES_FAIL:
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
