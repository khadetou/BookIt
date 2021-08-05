import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import { creteBooking } from "../../../controllers/bookingController";
import { isAuthenticated } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

connectDB();

handler.use(isAuthenticated).post(creteBooking);

export default handler;
