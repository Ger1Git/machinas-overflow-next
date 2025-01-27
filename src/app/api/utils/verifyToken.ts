import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

type VerifiedTokenPayload = JwtPayload | string;

const verifyJwtToken = (token: string): VerifiedTokenPayload => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("Invalid or expired token");
  }
};

export default verifyJwtToken;
