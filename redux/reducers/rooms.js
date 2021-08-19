import {
  GET_ALL_ROOMS,
  ROOMS_ERROR,
  GET_ROOM_DETAILS,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  CLEAR_ERROR,
} from "../types/type";

const initialState = {
  rooms: [],
  room: null,
  loading: true,
  error: null,
  review: null,
};

export const rooms = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_ALL_ROOMS:
      return {
        ...state,
        roomsCount: payload.roomsCount,
        resPerpage: payload.resPerpage,
        filteredRoomsCount: payload.filteredRoomsCount,
        rooms: payload.rooms,
        loading: false,
      };

    case ROOMS_ERROR: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

//Get Room Details
export const roomDetails = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_ROOM_DETAILS:
      return {
        ...state,
        room: payload,
        loading: false,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        review: payload,
        loading: false,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        review: false,
        loading: false,
      };
    case CLEAR_ERROR:
    case NEW_REVIEW_FAIL:
    case ROOMS_ERROR: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
