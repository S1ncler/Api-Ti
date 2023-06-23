import { Request, Response, query } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  loginUser,
  registerNewUser,
  validarToken,
  forgPassword,
  updatePassword,
} from "../services/auth.service";

export const registerCtrl = async ({ body }: Request, res: Response) => {
  try {
    const response = await registerNewUser(body);
    res.status(200).json({ msg: response });
  } catch (e) {
    handleHttp(res, `ERROR_REG_USUARIO=${e}`);
  }
};

export const loginCtrl = async ({ body }: Request, res: Response) => {
  try {
    const { email, contraseña } = body;
    const response = await loginUser(email, contraseña);
    response === "INCORRECT_USER_DATA"
      ? res.status(200).send({ msg: "no Login" })
      : res.status(200).send(response);
  } catch (e) {
    handleHttp(res, `ERROR_GET_USUARIOS=${e}`);
  }
};

export const valToken = async ({ body }: Request, res: Response) => {
  try {
    const { token } = body;
    if (token === undefined || token === "")
      res.status(401).send({ msg: "token vacio" });
    const response = await validarToken(token);
    response
      ? res.status(200).send({ msg: "valido" })
      : res.status(401).send({ msg: "Token Invalido" });
  } catch (e) {
    handleHttp(res, `ERROR_VALIDATING_TOKEN=${e}`);
  }
};

export const forgPass = async ({ body }: Request, res: Response) => {
  try {
    const { email, link } = body;
    if (email === undefined || email === "")
      res.status(401).send({ msg: "email vacio" });
    if (link === undefined || link === "")
      res.status(401).send({ msg: "link vacio" });
    const response = await forgPassword(email, link);
    response === true
      ? res.status(200).send({ msg: "Email sended ok" })
      : res.status(401).send({ msg: "error sending email" });
  } catch (e) {
    handleHttp(res, `ERROR_SENDING_EMAIL=${e}`);
  }
};

export const updatePass = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;
    const response = await updatePassword(email, password);
    response === true
      ? res.status(200).send({ msg: "Password updated ok" })
      : res.status(401).send({ msg: "error updating password" });
  } catch (e) {
    handleHttp(res, `ERROR_SENDING_EMAIL=${e}`);
  }
};
