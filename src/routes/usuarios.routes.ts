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
router.get("/:username", getUsuario);
router.post("/", postUsuario);
router.put("/:username", updateUsuario);
router.delete("/:username", deleteUsuario);

export { router };
