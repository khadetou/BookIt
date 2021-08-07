import Booking from "../models/booking";
import asyncHandler from "../middlewares/asyncHandler";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

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

//@desc check room booking availability
//@route get/api/bookings/check

export const checkBookingRoomAvailability = asyncHandler(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate, //$lte less than
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate, //$gte greater than
        },
      },
    ],
    //Both checkInDate and checkoutDate has to return true that's what we $and for
  });

  //Check if there is any booking available
  let isAvailable;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

//@desc check booked dates of a room
//@route get/api/bookings/check_booked_dates?roomId = roomId

export const checkBookedDates = asyncHandler(async (req, res) => {
  const { roomId } = req.query;
  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  bookings.forEach((booking) => {
    const range = moment.range(
      moment(booking.checkInDate),
      moment(booking.checkOutDate)
    );

    const dates = Array.from(range.by("day"));
    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

//@desc get all bookings of current user
//@route get/api/bookings/me

export const myBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    bookings,
  });
});

//@desc get booking details
//@route get/api/bookings/:id

export const getBookingDetails = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    booking,
  });
});
