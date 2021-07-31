import User from "../models/user";
import bcryptjs from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler";
import cloudinary from "cloudinary";

//Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINAR_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//@desc register user
//@route post/api/auth/register

export const registerUser = asyncHandler(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "bookit/avatars",
    width: "150",
    crop: "scale",
  });

  let { name, email, password } = req.body;

  //Encrypt Password
  const salt = await bcryptjs.genSalt(10);
  password = await bcryptjs.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Account registered successfully",
  });
});

//@desc get user
//@route get/api/me

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

//@desc Update user profile
//@route put/api/me

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { name, email, password, avatar } = req.body;

  if (user) {
    user.name = name;
    user.email = email;
    if (password) user.password = password;
  }

  //Update the avatar
  if (avatar !== "") {
    const image_id = user.avatar.public_id;

    //Delete user previous image/avatar
    await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "bookit/avatars",
      width: "150",
      crop: "scale",
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});
