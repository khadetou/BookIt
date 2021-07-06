import nc from 'next-connect'
import connectDB from '../../../config/dbConnect'
import { allRooms, newRoom } from '../../../controllers/roomController'

const handler = nc()

connectDB()

handler.get(allRooms)
handler.post(newRoom)
export default handler
