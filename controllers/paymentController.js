import Room from "../models/room";
import User from "../models/user";
import Booking from "../models/booking";
import getRawBody from "raw-body";
import absoluteUrl from "next-absolute-url";
import asyncHandler from "../middlewares/asyncHandler";

//@desc generate stripe checkout session
//@route Get/api/checkout_session/:roomId

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const stripeCheckOut = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.query.roomId);
  const { origin } = absoluteUrl(req);

  const { checkInDate, checkoutDate, daysOfStay } = req.query;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkoutDate, daysOfStay },

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

//@desc Create a booking after payment
//@route Post/api/webhook
export const webhookCheckOut = asyncHandler(async (req, res) => {
  //Write on my c:>Users>khade>: stripe listen --events checkout.session.completed --forward-to localhost:3000/api/webhook
  //And press enter so we'll get the key that we'll add to our env.

  const rawBody = await getRawBody(req);

  try {
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email })).id;

      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkoutDate;
      const daysOfStay = session.metadata.daysOfStay;

      console.log(checkInDate);
      console.log(checkOutDate);
      console.log(daysOfStay);

      await Booking.create({
        room,
        user,
        checkOutDate,
        checkInDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in Stripe Checkout Payment =>", error);
  }
});
