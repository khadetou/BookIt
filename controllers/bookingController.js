import Booking from "../models/booking";
import ErrorHandler from "../utils/errorHandler";
import asyncHandler from "../middlewares/asyncHandler";
import APIFeatures from "../utils/APIFeatures";

//@desc create new booking
//@route Pos/api/bookings

export const creteBooking = asyncHandler(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt,
  });
  res.status(200).json({
    success: true,
    booking,
  });
});
