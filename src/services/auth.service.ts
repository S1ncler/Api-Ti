import { tranporter } from "../config/mailer";
import { usuario } from "../interfaces/usuario.interface";
import UsuarioModel from "../models/usuario.model";
import { encrypt, verified } from "../utils/bcrypt.handle";
import {
  generateToken,
  verifyToken,
  generateTokenForgPass,
} from "../utils/jwt.handle";

const registerNewUser = async (authUser: usuario) => {
  const checkIs = await UsuarioModel.findOne({ email: authUser.email });
  const checkIs2 = await UsuarioModel.findOne({ username: authUser.username });
  if (checkIs) return "ALREADY_USER";
  if (checkIs2) return "ALREADY_USER";
  if (
    new Date(authUser.cumpleanos) >
    new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 18)
  )
    return "MUST_BE_AN_ADULT";
  const passHash = await encrypt(authUser.contrasena);
  authUser.contrasena = passHash;
  const responseInsert = await UsuarioModel.create(authUser);
  return responseInsert ? "Usuario creado correctamente" : responseInsert;
};

const loginUser = async (email: string, pass: string) => {
  const user = await UsuarioModel.findOne({ email });
  if (!user) return "INCORRECT_USER_DATA";
  const passHash = user.contrasena;
  const isVerified = await verified(pass, passHash);
  if (!isVerified) return "INCORRECT_USER_DATA";
  const token = await generateToken(user.email);
  const data = {
    token,
    usuario: user,
  };
  return data;
};

const validarToken = async (token: string) => {
  const isToken = await verifyToken(token);
  return isToken;
};

const forgPassword = async (email: string, link: string) => {
  let emailSended = true;
  const user = await UsuarioModel.findOne({ email });
  if (user) {
    link += await generateTokenForgPass(email);
    tranporter.sendMail({
      from: '"Forgot password" <u1701486@unimilitar.edu.co>',
      to: email,
      subject: "Forgot password",
      html: `
        <b>Haz click en el siguiente link para recuperar tu contraseña de tecnoimportaciones:<b>
        <br>
        <a href="${link}">${link}</a>`,
    });
  } else emailSended = false;
  return emailSended;
};

const updatePassword = async (email: string, pass: string) => {
  let updateOk = true;
  const passHash = await encrypt(pass);
  const user = await UsuarioModel.findOne({ email: email });
  if (user) {
    user.contrasena = passHash;
    await UsuarioModel.findOneAndUpdate({ email: email }, user);
  } else updateOk = false;
  return updateOk;
};

export {
  registerNewUser,
  loginUser,
  validarToken,
  forgPassword,
  updatePassword,
};
