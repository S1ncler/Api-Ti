import { Router } from "express";
import controllers from "../controllers/index";

const router = Router();

router.get("/", controllers.Usuarios.getUsuarios);
router.get("/:username", controllers.Usuarios.getUsuario);
router.post("/", controllers.Usuarios.postUsuario);

router.put("/", controllers.Usuarios.updateUser);
router.delete("/:username", controllers.Usuarios.deleteUsuario);
router.delete("/delete/:_id", controllers.Usuarios.deleteUserById);
router.put("/update/:_id", controllers.Usuarios.updateUsuarioById);
router.put("/:username", controllers.Usuarios.updateUsuario);

export { router };
