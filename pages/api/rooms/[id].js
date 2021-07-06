import nc from 'next-connect'
import connectDB from '../../../config/dbConnect'
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from '../../../controllers/roomController'

const handler = nc()

connectDB()

handler.get(getSingleRoom)
handler.put(updateRoom)
handler.delete(deleteRoom)
export default handler
