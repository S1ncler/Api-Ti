import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

export const getUsuario = (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, `ERROR_GET_USUARIO=${e}`);
  }
};

export const getUsuarios = (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, `ERROR_GET_USUARIOS=${e}`);
  }
};

export const updateUsuario = (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, `ERROR_UPDATE_USUARIO=${e}`);
  }
};

export const postUsuario = ({ body }: Request, res: Response) => {
  try {
    console.log(body);
    res.status(200);
    res.send(body);
  } catch (e) {
    handleHttp(res, `ERROR_POST_USUARIO=${e}`);
  }
};

export const deleteUsuario = (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, `ERROR_DELETE_USUARIO=${e}`);
  }
};
