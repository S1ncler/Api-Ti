import { Request, Response, query } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  insertUsuario,
  getUsuarioss,
  getusuario,
  updateusuario,
  deleteusuario,
  updateusuarioByID,
  deleteUserByID
} from "../services/usuario.service";
import Express from "express";
import Usermodel from "../models/usuario.model"

export const getUsuario = async ({ params }: Request, res: Response) => {
  try {
    const response = await getusuario(params.username);
    const data = response ? response : {msg: "NOT_FOUND"};
    res.status(200).send(data);
  } catch (e) {
    handleHttp(res, `ERROR_GET_USUARIO=${e}`);
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const response = await getUsuarioss();
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res, `ERROR_GET_USUARIOS=${e}`);
  }
};

// export const updateUsuario = async ({ body, params }: Request, res: Response) => {
//   try {
//     const response = await updateusuario(params.username, body);
//     res.status(200).send(response);
//   } catch (e) {
//     handleHttp(res, `ERROR_UPDATE_USUARIO=${e}`);
//   }
// };
export const updateUser = async (req: Express.Request, res: Express.Response) => {
  try {
    
    let {dataToUpdate, _id} = req.body
    const updatedData = await Usermodel.findByIdAndUpdate(_id, dataToUpdate)
    return res.status(200).json ({msg: "Usuario actualizado"})

  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }
};
export const updateUsuarioById = async ({ body, params }: Request, res: Response) => {
  try {
    const response = await updateusuarioByID(params._id, body);
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res, `ERROR_UPDATE_USUARIO=${e}`);
  }
};

export const postUsuario = async ({ body }: Request, res: Response) => {
  try {
    const response = await insertUsuario(body);
    res.send(response);
  } catch (e) {
    handleHttp(res, `ERROR_POST_USUARIO=${e}`);
  }
};

export const deleteUsuario = async ({ params }: Request, res: Response) => {
  try {
    const response = await deleteusuario(params.username);
    res.status(200).json({msg: response});
  } catch (e) {
    handleHttp(res, `ERROR_DELETE_USUARIO=${e}`);
  }
};


export const deleteUserById = async ({ params }: Request, res: Response) => {
  try {
    // const response = await deleteusuario(params.username);
    const response = await deleteUserByID(params._id);
    res.status(200).json({msg: response});
  } catch (e) {
    handleHttp(res, `ERROR_DELETE_USUARIO=${e}`);
  }
};
