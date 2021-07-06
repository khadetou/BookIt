import mongoose from 'mongoose'
const roomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false,
  },
  name: {
    type: String,
    required: [true, 'Room name is required'],
    trim: true,
    maLength: [100, 'Room name cannot exceed 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Price  is required'],
    defaultValue: 0.0,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  guestCapacity: {
    type: Number,
    required: [true, 'GuestCapacity is required'],
  },
  numOfBeds: {
    type: Number,
    required: [true, 'The number of bed is required'],
  },
  internet: {
    type: Boolean,
    default: false,
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  airConditioned: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  roomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  enum: {
    values: ['King', 'Single', 'Twins'],
    message: 'Select a category of your room',
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model.Room || mongoose.model('Room', roomSchema)
