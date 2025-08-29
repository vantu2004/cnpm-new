import {
  register as registerService,
  login as loginService,
} from "../services/userService.js";

export const register = async (req, res) => {
  try {
    const result = await registerService(req.body);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
