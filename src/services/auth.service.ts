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
  if (new Date(authUser.cumpleanos) > new Date('2005-01-01')) return "MUST_BE_AN_ADULT";
  const passHash = await encrypt(authUser.contrasena);
  authUser.contrasena = passHash;
  const responseInsert = await UsuarioModel.create(authUser);
  return responseInsert ? "Usuario creado correctamente" : responseInsert;
};

const loginUser = async (email: string, pass: string) => {
  const user = await UsuarioModel.findOne({ email });
  if(!user) return "INCORRECT_USER_DATA";
  const passHash = user.contrasena;
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
