import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const UserController = {
  async create(req: Request, res: Response) {
    try {
      const { name, email, address } = req.body;
      if (!name || !email)
        return res.status(400).json({ message: "name & email required" });
      const created = await UserService.create({ name, email, address });
      res.status(201).json(created);
    } catch (e: any) {
      if (e?.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Email already exists" });
      }
      res.status(500).json({ message: "Server error", error: e?.message });
    }
  },

  async list(_req: Request, res: Response) {
    const users = await UserService.findAll();
    res.json(users);
  },

  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await UserService.findById(id);
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await UserService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const count = await UserService.remove(id);
    if (!count) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  },
};
