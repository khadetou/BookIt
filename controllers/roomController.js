import Room from '../models/room'

//@desc get all rooms
//@route Get/api/rooms

export const allRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
    res.status(200).json({
      success: true,
      rooms,
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//@desc get single romm
//@route Get/api/rooms/:id
export const getSingleRoom = async (req, res) => {
  const { id } = req.query
  try {
    const room = await Room.findById(id)
    if (!room) {
      res.status(400).json({
        success: false,
        error: 'No room found with this id',
      })
    }
    res.status(200).json({
      success: true,
      room,
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//@desc Create new room
//@route Post/api/rooms

export const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body)
    res.status(201).json({ success: true, room })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//@desc update new room
//@route Put/api/rooms/id
export const updateRoom = async (req, res) => {
  const { id } = req.query
  try {
    let room = await Room.findById(id)
    if (!room) {
      res.status(400).json({
        success: false,
        error: 'No room found with this id',
      })
    }

    room = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })

    res.status(200).json({
      success: true,
      room,
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//@desc Delete room
//@route Put/api/rooms/id
export const deleteRoom = async (req, res) => {
  const { id } = req.query
  try {
    const room = await Room.findById(id)
    if (!room) {
      res.status(400).json({
        success: false,
        error: 'No room found with this id',
      })
    }

    await room.remove()

    res.status(200).json({
      success: true,
      message: 'Room is deleted',
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
