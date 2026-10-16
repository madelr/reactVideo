export interface Producto {
  idProducto: number | null;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  idCategoria: number | null;
}
export interface ProductoCategoria {
  categoria: string;
  cantidad: number;
}
export interface ApiMensaje {
  mensaje: string;
}
export interface ProductoCategoria {
  nombreProducto: string;
  nombreCategoria: string;
}
export interface ProductoCategoriaR {
  nombreProducto: string;
  nombreCategoria: string;
}
