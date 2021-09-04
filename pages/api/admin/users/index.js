import nc from "next-connect";
import connectDB from "../../../../config/dbConnect";
import { getAdminUsers } from "../../../../controllers/authController";
import { isAuthenticated, authorizeRoles } from "../../../../middlewares/auth";
import onError from "../../../../middlewares/errors";

const handler = nc({ onError });

connectDB();

handler.use(isAuthenticated, authorizeRoles("admin")).get(getAdminUsers);

export default handler;
