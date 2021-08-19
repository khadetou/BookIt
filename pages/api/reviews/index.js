import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import { createRoomReview } from "../../../controllers/roomController";
import onError from "../../../middlewares/errors";
import { isAuthenticated } from "../../../middlewares/auth";

const handler = nc({ onError });

connectDB();

handler.use(isAuthenticated).put(createRoomReview);

export default handler;
