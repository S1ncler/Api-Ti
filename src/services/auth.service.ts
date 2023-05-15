import { response } from "express";
import { usuario } from "../interfaces/usuario.interface";
import UsuarioModel from "../models/usuario.model";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async (authUser: usuario) => {
  const checkIs = await UsuarioModel.findOne({ email: authUser.email });
  const checkIs2 = await UsuarioModel.findOne({ username: authUser.username });
  if (checkIs) return "ALREADY_USER";
  if (checkIs2) return "ALREADY_USER";
  const passHash = await encrypt(authUser.contraseña);
  authUser.contraseña = passHash;
  const responseInsert = await UsuarioModel.create(authUser);
  return responseInsert;
};

const loginUser = async (email: string, pass: string) => {
  const user = await UsuarioModel.findOne({ email });
  if(!user) return "INCORRECT_USER_DATA";
  const passHash = user.contraseña;
  const isVerified = await verified(pass, passHash);
  if(!isVerified) return "INCORRECT_USER_DATA";
  const token = await generateToken(user.email);
  const data = {
    token,
    usuario: user,
  };
  return data;
};

export { registerNewUser, loginUser };
