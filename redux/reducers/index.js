import { combineReducers } from "redux";
import {
  rooms,
  roomDetails,
  newRoom,
  updateRoom,
  deleteRoom,
  getReviews,
} from "./rooms";
import { auth } from "./users";
import { booking } from "./booking";

export default combineReducers({
  allRooms: rooms,
  room: roomDetails,
  auth,
  booking,
  newRoom,
  updateRoom,
  deleteRoom,
  getReviews,
});
