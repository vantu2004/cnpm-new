import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/index.js";

const auth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload; // { id, email }
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default auth;
