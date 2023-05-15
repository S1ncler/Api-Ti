import { Router, Request, Response } from "express";
import {
  deleteProducto,
  getProducto,
  getProductos,
  postProducto,
  updateProducto,
} from "../controllers/productos.controller";
import { logMiddleware } from "../middlewares/log";

const router = Router();

router.get("/", getProductos);
router.get("/:id", logMiddleware, getProducto);
router.post("/", postProducto);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);

export { router };
