import nc from 'next-connect'
import connectDB from '../../../config/dbConnect'
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from '../../../controllers/roomController'
import onError from '../../../middlewares/errors'

const handler = nc({ onError })

connectDB()

handler.get(getSingleRoom)
handler.put(updateRoom)
handler.delete(deleteRoom)
export default handler
