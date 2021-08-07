import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import { myBookings } from "../../../controllers/bookingController";
import { isAuthenticated } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

connectDB();

handler.use(isAuthenticated).get(myBookings);

export default handler;
