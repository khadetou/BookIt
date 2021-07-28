import nc from "next-connect";
import connectDB from "../../../config/dbConnect";
import { registerUser } from "../../../controllers/authController";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

connectDB();

handler.post(registerUser);

export default handler;
