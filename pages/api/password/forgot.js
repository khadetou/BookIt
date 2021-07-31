import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import { forgotPassword } from "../../../controllers/authController";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

connectDB();

handler.post(forgotPassword);

export default handler;
