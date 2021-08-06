import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import { checkBookedDates } from "../../../controllers/bookingController";

import onError from "../../../middlewares/errors";

const handler = nc({ onError });

connectDB();

handler.get(checkBookedDates);

export default handler;
