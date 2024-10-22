import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: string;
  exp: number;
  iat: number;
};

export const validateUserCookie = async (): Promise<JwtPayload | null> => {
  const theCookie = cookies().get("expense-tracker")?.value;
  if (theCookie) {
    try {
      const decoded = jwt.verify(
        theCookie,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      return decoded;
    } catch (error) {
      console.error("JWT verification failed:", error);
      return null;
    }
  }
  return null; // Explicitly return null if no cookie is found
};
