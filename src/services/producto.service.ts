import { producto } from "../interfaces/producto.interface";
import ProductoModel from "../models/producto.model";

const insert_producto = async (producto: producto) => {
  const responseInsert = await ProductoModel.create(producto);
  return responseInsert;
};

const get_productos = async () => {
  const responseProductos = await ProductoModel.find({});
  return responseProductos;
};

const get_producto = async (id: string) => {
  const responseProductos = await ProductoModel.findOne({
    id: Number(id),
  });
  return responseProductos;
};

const update_producto = async (id: string, data: producto) => {
  const responseProductos = await ProductoModel.findOneAndUpdate(
    { id: id },
    data,
    { new: true}
  );
  return responseProductos;
};

const delete_producto = async (id: string) => {
  const responseProductos = await ProductoModel.findOneAndRemove({
    id: id,
  });
  return responseProductos;
};

export {
  insert_producto,
  get_productos,
  get_producto,
  update_producto,
  delete_producto,
};