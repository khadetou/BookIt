import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { GET_ALL_ROOMS, GET_ROOM_DETAILS, ROOMS_ERROR } from "../types/type";

export const getAllRooms =
  (req, currentpage = 1, location = "") =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(
        `${origin}/api/rooms?page=${currentpage}&location=${location}`
      );

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
