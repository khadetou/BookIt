import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { GET_ALL_ROOMS, ROOMS_ERROR } from "../types/type";

export const getAllRooms = (req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);
    const { data } = await axios.get(`${origin}/api/rooms`);

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
