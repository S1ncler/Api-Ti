import { usuario } from "../interfaces/usuario.interface";
import UsuarioModel from "../models/usuario.model";
import { encrypt } from "../utils/bcrypt.handle";

const insertUsuario = async (usuario: usuario) => {
  const responseInsert = await UsuarioModel.create(usuario);
  return responseInsert;
};

const getUsuarioss = async () => {
  const responseUsuarios = await UsuarioModel.find({});
  return responseUsuarios;
};

const getusuario = async (email: string) => {
  const responseUsuarios = await UsuarioModel.findOne({
    email: email,
  });
  return responseUsuarios;
};

const updateusuario = async (username: string, data: usuario) => {
  data.contrasena = await encrypt(data.contrasena);
  const responseUsuarios = await UsuarioModel.findOneAndUpdate(
    { username: username },
    data,
    { new: true}
  );
  return responseUsuarios;
};

const deleteusuario = async (username: string) => {
  const responseUsuarios = await UsuarioModel.findOneAndRemove({
    username: username,
  });
  return responseUsuarios === null ? "No se encontro el usuario": "Usuario eliminado correctamente";
};


const deleteUserByID = async (_id: string) => {
  const responseUsuarios = await UsuarioModel.findByIdAndRemove(_id);
  return responseUsuarios === null ? "No se encontro el usuario": "Usuario eliminado correctamente";
};

const updateusuarioByID = async (_id: string, data: usuario) => {
  const responseUsuarios = await UsuarioModel.findOneAndUpdate(
    { _id: _id },
    data,
    { new: true}
  );
  return responseUsuarios;
};

export {
  insertUsuario,
  getUsuarioss,
  getusuario,
  updateusuario,
  deleteusuario,
  deleteUserByID,
  updateusuarioByID
};


