import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { delete_producto, get_producto, get_productos, insert_producto, update_producto } from "../services/producto.service";

export const getProducto = async ({ params }: Request, res: Response) => {
  try {
    const response = await get_producto(params.id);
    const data = response ? response : "NOT_FOUND";
    res.status(200).send(data);
  } catch (e) {
    handleHttp(res, `ERROR_GET_PRODUCTO=${e}`);
  }
};

export const getProductos = async (req: Request, res: Response) => {
  try {
    const response = await get_productos();
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res, `ERROR_GET_PRODUCTOS=${e}`);
  }
};

export const updateProducto = async ({ params, body }: Request, res: Response) => {
  try {
    const response = await update_producto(params.id, body);
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res, `ERROR_UPDATE_PRODUCTO=${e}`);
  }
};

export const postProducto = async ({ body }: Request, res: Response) => {
  try {
    const response = await insert_producto(body);
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res, `ERROR_POST_PRODUCTO=${e}`);
  }
};

export const deleteProducto = async ({ params }: Request, res: Response) => {
  try {
    const response = await delete_producto(params.id);
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res, `ERROR_DELETE_PRODUCTO=${e}`);
  }
};