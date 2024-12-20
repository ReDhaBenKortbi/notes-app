import { CorsOptions } from "cors";

const allowedOrigins = ["http://localhost:5173"];

export const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (
      (typeof origin === "string" && allowedOrigins.indexOf(origin) !== -1) ||
      !origin
    ) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
};
