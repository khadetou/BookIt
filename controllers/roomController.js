import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import asyncHandler from "../middlewares/asyncHandler";
import APIFeatures from "../utils/APIFeatures";

//@desc get all rooms
//@route Get/api/rooms

export const allRooms = asyncHandler(async (req, res) => {
  const resPerpage = 4;
  const roomsCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeatures.query;
  let filteredRoomsCount = rooms.length;

  apiFeatures.pagination(resPerpage);
  rooms = await apiFeatures.query;

  res.status(200).json({
    success: true,
    roomsCount,
    resPerpage,
    filteredRoomsCount,
    rooms,
  });
});

//@desc get single romm
//@route Get/api/rooms/:id
export const getSingleRoom = asyncHandler(async (req, res, next) => {
  const { id } = req.query;
  const room = await Room.findById(id);

  if (!room) {
    // res.status(400).json({
    //   success: false,
    //   error: 'No room found with this id',
    // })
    return next(new ErrorHandler("Room not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});
//@desc Create new room
//@route Post/api/rooms

export const newRoom = asyncHandler(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json({ success: true, room });
});

//@desc update new room
//@route Put/api/rooms/id
export const updateRoom = asyncHandler(async (req, res) => {
  const { id } = req.query;

  let room = await Room.findById(id);
  if (!room) {
    res.status(400).json({
      success: false,
      error: "No room found with this id",
    });
  }

  room = await Room.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

//@desc Delete room
//@route Put/api/rooms/id
export const deleteRoom = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const room = await Room.findById(id);
  if (!room) {
    res.status(400).json({
      success: false,
      error: "No room found with this id",
    });
  }

  await room.remove();

  res.status(200).json({
    success: true,
    message: "Room is deleted",
  });
});
