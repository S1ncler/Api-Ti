import { producto } from "./producto.interface";

export interface pedido {
  productos: producto[];
  estado: string;
}
