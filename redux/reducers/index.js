import { combineReducers } from "redux";
import { rooms, roomDetails, newRoom, updateRoom } from "./rooms";
import { auth } from "./users";
import { booking } from "./booking";

export default combineReducers({
  allRooms: rooms,
  room: roomDetails,
  auth,
  booking,
  newRoom,
  updateRoom,
});
