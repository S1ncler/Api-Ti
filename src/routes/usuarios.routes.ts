import { Router } from "express";
import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  updateUsuario,
} from "../controllers/usuarios.controller";

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", getUsuario);
router.post("/", postUsuario);
router.put("/", updateUsuario);
router.delete("/", deleteUsuario);

export { router };
