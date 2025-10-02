import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req); // send request to Arcjet

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too many requests. Please try again" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied" });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied by security policy" });
      }
    }

    // check for spoofed bots: which pretend to be human
    if (decision.results.some(isSpoofedBot)) {
      return res.status(429).json({
        error: "Spoofed bot detacted",
        message: "Malicious bot activity detected.",
      });
    }
    next();
  } catch (error) {
    console.log("Arcjet Protections Error: ", error);
    next();
  }
};
