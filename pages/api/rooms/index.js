import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import { allRooms, newRoom } from "../../../controllers/roomController";
import onError from "../../../middlewares/errors";
import { authorizeRoles, isAuthenticated } from "../../../middlewares/auth";
const handler = nc({ onError });

connectDB();

handler.get(allRooms);
handler.use(isAuthenticated, authorizeRoles("admin")).post(newRoom);

export default handler;
