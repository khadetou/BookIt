import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import { stripeCheckOut } from "../../../controllers/paymentController";
import { isAuthenticated } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

connectDB();

handler.use(isAuthenticated).get(stripeCheckOut);

export default handler;
