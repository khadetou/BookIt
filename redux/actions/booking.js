import {
  CHECK_BOOKING_FAIL,
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  CHECK_BOOKING_SUCCESS,
  SET_LOADING,
} from "../types/type";
import axios from "axios";

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
      payload: error.response.data.message,
    });
  }
};
