import mongoose from 'mongoose'

const connectDB = () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((con) => console.log(`Connected to mongoDB ${con.connection.host}`))
}

export default connectDB
