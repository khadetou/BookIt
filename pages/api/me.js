import nc from "next-connect";
import connectDB from "../../config/dbConnect";
import { getUser } from "../../controllers/authController";
import onError from "../../middlewares/errors";
import { isAuthenticated } from "../../middlewares/auth";
const handler = nc({ onError });

connectDB();

handler.use(isAuthenticated).get(getUser);

export default handler;
