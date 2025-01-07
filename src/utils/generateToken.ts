import jwt from "jsonwebtoken";

export function generateToken(type: "access" | "refresh", payload: {}) {
  const secret =
    type === "access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;

  const duration = type === "access" ? "15m" : "7d";

  return jwt.sign(payload, secret || "", {
    expiresIn: duration,
  });
}
