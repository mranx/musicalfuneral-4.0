import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as { adminId: string; email: string; role: string };
};
