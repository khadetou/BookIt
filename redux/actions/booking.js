import {
  CHECK_BOOKING_FAIL,
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  CHECK_BOOKING_SUCCESS,
  SET_LOADING,
  GET_BOOKINGS_FAIL,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_DETAILS_FAIL,
  GET_BOOKINGS_DETAILS_SUCCESS,
} from "../types/type";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const checkBooking =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING });
      let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
      const { data } = await axios.get(link);

      dispatch({
        type: CHECK_BOOKING_SUCCESS,
        payload: data.isAvailable,
      });
    } catch (error) {
      dispatch({
        type: CHECK_BOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get Bookings
export const getBookings = (authCookie, req) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const { origin } = absoluteUrl(req);
    const headers = req.headers;
    const config = {
      headers: {
        cookie: authCookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/bookings/me`, config);

    dispatch({
      type: GET_BOOKINGS_SUCCESS,
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKINGS_FAIL,
      payload: error.response,
    });
  }
};

// Get Booking details
export const getBookingDetails = (authCookie, req, id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const { origin } = absoluteUrl(req);

    const config = {
      headers: {
        cookie: authCookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/bookings/${id}`, config);

    dispatch({
      type: GET_BOOKINGS_DETAILS_SUCCESS,
      payload: data.booking,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKINGS_DETAILS_FAIL,
      payload: error.response,
    });
  }
};

// Get BookedDates
export const getBookedDates = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    let link = `/api/bookings/check_booked_dates?roomId=${roomId}`;
    const { data } = await axios.get(link);

    dispatch({
      type: BOOKED_DATES_SUCCESS,
      payload: data.bookedDates,
    });
  } catch (error) {
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload: error.response,
    });
  }
};
