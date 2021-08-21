import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  GET_ALL_ROOMS,
  GET_ROOM_DETAILS,
  ROOMS_ERROR,
  NEW_REVIEW_FAIL,
  SET_LOADING,
  NEW_REVIEW_SUCCESS,
  CLEAR_ERROR,
  REVIEW_AVAILABILITY_SUCCESS,
  REVIEW_AVAILABILITY_FAIL,
  ADMIN_ROOM_SUCCESS,
  ADMIN_ROOM_FAIL,
} from "../types/type";

export const getAllRooms =
  (req, currentpage = 1, location = "", guest, category) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
      let link = `${origin}/api/rooms?page=${currentpage}&location=${location}`;
      if (guest) link = link.concat(`&guestCapacity=${guest}`);
      if (category) link = link.concat(`&category=${category}`);
      const { data } = await axios.get(link);

      dispatch({
        type: GET_ALL_ROOMS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ROOMS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

//Get Room Details
export const getRoomDetails = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);
    const { data } = await axios.get(`${origin}/api/rooms/${id}`);

    dispatch({
      type: GET_ROOM_DETAILS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOMS_ERROR,
      payload: error.response.data.message,
    });
  }
};

//put new reviews
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put("/api/reviews", reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.message,
    });
  }
};

//CHECK REVIEW
export const checkReview = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const { data } = await axios.get(
      `/api/reviews/check_review?roomId=${roomId}`
    );

    dispatch({
      type: REVIEW_AVAILABILITY_SUCCESS,
      payload: data.isReviewAvailable,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_AVAILABILITY_FAIL,
      payload: error.message,
    });
  }
};

export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
    payload: null,
  });
};

export const getAdminRooms = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    let link = `/api/admin/rooms`;
    const { data } = await axios.get(link);

    dispatch({
      type: ADMIN_ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};
