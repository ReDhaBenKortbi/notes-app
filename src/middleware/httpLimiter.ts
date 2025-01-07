import { rateLimit } from "express-rate-limit";
import { mainLogger } from "../config/logger.js";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
  handler: (req, res, next, options) => {
    mainLogger.error(
      `Too many requests for ${req.ip}%t${req.url}%t${req.method}%t${req.headers.origin}`
    );
    return res.status(options.statusCode).json({
      message: "Too many requests, try again later!",
    });
  },
});
