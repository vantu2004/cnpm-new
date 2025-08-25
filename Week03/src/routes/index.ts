import { Router } from "express";
import router from "./user.route";

const r = Router();

r.get("/health", (_req, res) => res.json({ ok: true }));
r.use("/users", router);

export default r;
