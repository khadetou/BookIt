import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import { getBookingDetails } from "../../../controllers/bookingController";
import { isAuthenticated } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

connectDB();

handler.use(isAuthenticated).get(getBookingDetails);

export default handler;
