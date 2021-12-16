import nc from "next-connect";
import connectDB from "../../config/dbConnect";
import { getUser, updateProfile } from "../../controllers/authController";
import onError from "../../middlewares/errors";
import { isAuthenticated } from "../../middlewares/auth";
const handler = nc({ onError });

connectDB();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

handler.use(isAuthenticated).get(getUser);
handler.use(isAuthenticated).put(updateProfile);

export default handler;
