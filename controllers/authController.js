import User from "../models/user";
import bcryptjs from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler";

//@desc register user
//@route post/api/auth/register

export const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  //Encrypt Password
  const salt = await bcryptjs.genSalt(10);
  password = await bcryptjs.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "PUBLIC_ID",
      url: "URL",
    },
  });

  res.status(200).json({
    success: true,
    message: "Account registered successfully",
  });
});
