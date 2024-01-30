import * as jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
  return jwt.sign({ userId: user?._id }, process.env.jwtSecret, {
    expiresIn: "4h",
  });
};
