import nc from "next-connect";
import connectDB from "../../config/dbConnect";
import { getUser, updateProfile } from "../../controllers/authController";
import onError from "../../middlewares/errors";
import { isAuthenticated } from "../../middlewares/auth";
const handler = nc({ onError });

connectDB();

handler.use(isAuthenticated).get(getUser);
handler.use(isAuthenticated).put(updateProfile);

export default handler;
