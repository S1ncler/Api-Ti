import { Request, Response, query } from "express";
import { handleHttp } from "../utils/error.handle";
import { loginUser, registerNewUser } from "../services/auth.service";

export const registerCtrl = async ({ body }: Request, res: Response) => {
  try {
    const response = await registerNewUser(body);
    res.status(200).json({msg: response});
  } catch (e) {
    handleHttp(res, `ERROR_REG_USUARIO=${e}`);
  }
};

export const loginCtrl = async ({ body }: Request, res: Response) => {
  try {
    const { email, contraseña } = body
    const response = await loginUser(email, contraseña);
    response === "INCORRECT_USER_DATA" ? res.status(401).send(response): res.status(200).send(response);
    
  } catch (e) {
    handleHttp(res, `ERROR_GET_USUARIOS=${e}`);
  }
};
