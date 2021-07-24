import { combineReducers } from "redux";
import { rooms, roomDetails } from "./rooms";
export default combineReducers({
  allRooms: rooms,
  room: roomDetails,
});
