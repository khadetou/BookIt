import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import { checkReviewAvailability } from "../../../controllers/roomController";
import onError from "../../../middlewares/errors";
import { isAuthenticated } from "../../../middlewares/auth";

const handler = nc({ onError });

connectDB();

handler.use(isAuthenticated).get(checkReviewAvailability);

export default handler;
