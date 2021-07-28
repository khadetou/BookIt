import { combineReducers } from "redux";
import { rooms, roomDetails } from "./rooms";
import { auth } from "./users";

export default combineReducers({
  allRooms: rooms,
  room: roomDetails,
  auth,
});
