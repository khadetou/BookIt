import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import {
  createRoomReview,
  allRoomsReviews,
} from "../../../controllers/roomController";
import onError from "../../../middlewares/errors";
import { isAuthenticated, authorizeRoles } from "../../../middlewares/auth";

const handler = nc({ onError });

connectDB();

handler.use(isAuthenticated).put(createRoomReview);

handler.use(isAuthenticated, authorizeRoles("admin")).get(allRoomsReviews);
export default handler;
