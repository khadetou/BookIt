import Room from '../models/room'

//@desc get all rooms
//@route Get/api/rooms

export const allRooms = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'All rooms',
  })
}

//@desc Create new room
//@route Post/api/rooms

export const newRoom = async (req, req) => {
  try {
    const room = await Room.create(req.body)
    res.status(200).json({ success: true, room })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
