import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Types } from "mongoose";

const generateTokenAndSetCookie = async (
  userId: Types.ObjectId
): Promise<void> => {
  const token = jwt.sign(
    { userId: userId.toString() },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "10d",
    }
  );
  const cookieStore = await cookies();

  cookieStore.set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 10,
    sameSite: "strict",
    path: "/",
  });
};

export default generateTokenAndSetCookie;
