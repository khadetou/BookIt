const Room = require('../models/room')
const rooms = require('../data/rooms.json')
const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://khadetou:KhadetouDyaniyamba96.@hotcodes.pflqn.mongodb.net/bookit?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)

const seedRooms = async () => {
  try {
    await Room.deleteMany()
    console.log('Rooms are deleted')
    await Room.insertMany(rooms)
    console.log('All rooms are added')
    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

seedRooms()
