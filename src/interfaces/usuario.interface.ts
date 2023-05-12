import { factura } from "./factura.interface";
import { pedido } from "./pedido.interface";

export interface usuario {
  nombre: string;
  email: string;
  telefono: number;
  contraseña: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  complemento: string;
  codigoPostal: string;
  facturas: factura[];
  pedidos: pedido[];
}
