import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { jwtSecret } from "../config/index.js";

export const register = async ({ name, email, password }) => {
  const existed = await User.findOne({ email });
  if (existed) throw new Error("Email already exists");

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
    expiresIn: "7d",
  });
  return { user: { id: user._id, name: user.name, email: user.email }, token };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
    expiresIn: "7d",
  });
  return { user: { id: user._id, name: user.name, email: user.email }, token };
};
