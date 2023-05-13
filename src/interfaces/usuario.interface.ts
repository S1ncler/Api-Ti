import { factura } from "./factura.interface";
import { pedido } from "./pedido.interface";

export interface usuario {
  username: String;
  nombre: String;
  email: String;
  telefono: number;
  contraseña: String;
  departamento: String;
  ciudad: String;
  direccion: String;
  complemento: String;
  codigoPostal: String;
  facturas: factura[];
  pedidos: pedido[];
}
