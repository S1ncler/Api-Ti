import { factura } from "../interfaces/factura.interface";
import { pedido } from "../interfaces/pedido.interface";
import { usuario } from "../interfaces/usuario.interface";
import ProductoModel from "../models/producto.model";
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
    { new: true }
  );
  return responseUsuarios;
};

const deleteusuario = async (username: string) => {
  const responseUsuarios = await UsuarioModel.findOneAndRemove({
    username: username,
  });
  return responseUsuarios === null
    ? "No se encontro el usuario"
    : "Usuario eliminado correctamente";
};

const deleteUserByID = async (_id: string) => {
  const responseUsuarios = await UsuarioModel.findByIdAndRemove(_id);
  return responseUsuarios === null
    ? "No se encontro el usuario"
    : "Usuario eliminado correctamente";
};

const updateusuarioByID = async (_id: string, data: usuario) => {
  const responseUsuarios = await UsuarioModel.findOneAndUpdate(
    { _id: _id },
    data,
    { new: true }
  );
  return responseUsuarios;
};

const compra_servie = async (
  factura: factura,
  pedido: pedido,
  email: string
) => {
  // resta los productos comprados del stock
  for(let item of pedido.productos){
    let product = await ProductoModel.findOne({id: item.id});
    if (product){    
      product.stock = product.stock - 1;
      if(product.stock < 0) return "sin stock";
      await ProductoModel.findOneAndUpdate(
        { id: product.id },
        product,
        { new: true }
      );
    }    
  }
  // busca el usuario, guarda la factura y el pedido y luego guarda nuevamente el usuario
  let user = await UsuarioModel.findOne({ email: email });
  if (user) {
    user.pedidos.push(pedido);
    user.facturas.push(factura);

    const responseUsuarios = await UsuarioModel.findOneAndUpdate(
      { email: email },
      user,
      { new: true }
    );
    return responseUsuarios
      ? "Compra realizada correctamente"
      : "Error en la compra";
  }
  return "Error en la compra";
};

export {
  insertUsuario,
  getUsuarioss,
  getusuario,
  updateusuario,
  deleteusuario,
  deleteUserByID,
  updateusuarioByID,
  compra_servie,
};
