import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

export const getProducto = (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, `ERROR_GET_PRODUCTO=${e}`);
  }
};

export const getProductos = (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, `ERROR_GET_PRODUCTOS=${e}`);
  }
};

export const updateProducto = (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, `ERROR_UPDATE_PRODUCTO=${e}`);
  }
};

export const postProducto = ({ body }: Request, res: Response) => {
  try {
    res.status(200).send(body);
  } catch (e) {
    handleHttp(res, `ERROR_POST_PRODUCTO=${e}`);
  }
};

export const deleteProducto = (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, `ERROR_DELETE_PRODUCTO=${e}`);
  }
};