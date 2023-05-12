import { Router, Request, Response } from "express";
import {
  deleteProducto,
  getProducto,
  getProductos,
  postProducto,
  updateProducto,
} from "../controllers/productos.controller";

const router = Router();

router.get("/", getProductos);
router.get("/:id", getProducto);
router.post("/", postProducto);
router.put("/", updateProducto);
router.delete("/", deleteProducto);

export { router };
