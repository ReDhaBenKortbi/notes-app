import jwt from "jsonwebtoken";

export function generateToken(type: "access" | "refresh", payload: object) {
  const secret =
    type === "access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;

  const duration = type === "access" ? "10s" : "1d";

  return jwt.sign(payload, secret || "", {
    expiresIn: duration,
  });
}
