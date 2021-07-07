import nc from 'next-connect'
import connectDB from '../../../config/dbConnect'
import { allRooms, newRoom } from '../../../controllers/roomController'
import onError from '../../../middlewares/errors'

const handler = nc({ onError })

connectDB()

handler.get(allRooms)
handler.post(newRoom)

export default handler
