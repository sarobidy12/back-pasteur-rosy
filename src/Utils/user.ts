import * as jwt from "jsonwebtoken";

export const getUserIdFromToken = (token: string): string | null => {
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, process.env.jwtSecret);
    return jwtPayload.userId;
  } catch (error) {
    return null;
  }
};
