import Room from "../models/room";
import User from "../models/user";
import Booking from "../models/booking";
import absoluteUrl from "next-absolute-url";
import asyncHandler from "../middlewares/asyncHandler";

//@desc generate stripe checkout session
//@route Get/api/checkout_session/:roomId

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const stripeCheckOut = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.query.roomId);
  const { origin } = absoluteUrl(req);

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/bookigs/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: room.name,
        images: [`${room.images[0].url}`],
        amount: req.query.amount * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  res.status(200).json(session);
});
