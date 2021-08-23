import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../../controllers/roomController";
import onError from "../../../middlewares/errors";
import { authorizeRoles, isAuthenticated } from "../../../middlewares/auth";

const handler = nc({ onError });

connectDB();

handler.get(getSingleRoom);
handler.use(isAuthenticated, authorizeRoles("admin")).put(updateRoom);
handler.use(isAuthenticated, authorizeRoles("admin")).delete(deleteRoom);
export default handler;
