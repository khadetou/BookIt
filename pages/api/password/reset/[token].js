import nc from "next-connect";
import connectDB from "../../../../config/dbConnect";
import { resetPassword } from "../../../../controllers/authController";
import onError from "../../../../middlewares/errors";

const handler = nc({ onError });

connectDB();

handler.put(resetPassword);

export default handler;
