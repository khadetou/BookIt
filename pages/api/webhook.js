import nc from "next-connect";
import connectDB from "../../config/dbConnect";
import { webhookCheckOut } from "../../controllers/paymentController";
import onError from "../../middlewares/errors";

const handler = nc({ onError });

connectDB();
//Because we used in the controller getRawBody
export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhookCheckOut);

export default handler;
