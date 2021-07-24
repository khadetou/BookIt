import { GET_ALL_ROOMS, ROOMS_ERROR, ROOMS_SUCCESS } from "../types/type";

const initialState = {
  rooms: [],
  loading: true,
  error: null,
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
