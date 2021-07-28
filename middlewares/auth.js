import asyncHandler from "./asyncHandler";
import ErrorHandler from "../utils/errorHandler";
import { getSession } from "next-auth/client";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler("You need to be authenticated first", 401));
  }

  req.user = session.user;
  next();
});
