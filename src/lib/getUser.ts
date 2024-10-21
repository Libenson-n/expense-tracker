import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const validateUserCookie = async () => {
  const theCookie = cookies().get("expense-tracker")?.value;
  if (theCookie) {
    try {
      const decoded = jwt.verify(theCookie, process.env.JWT_SECRET as string);
      return decoded;
    } catch (error) {
      return null;
    }
  }
};
