import api from "../api/axios";
import type {
  Producto,
  ProductoCategoria,
  ProductoCategoriaR,
} from "../types/producto";

export const listarProductosActivos = () =>
  api.get<Producto[]>("/productos/activos");

export const productoCategoriaReporte = () =>
  api.get<ProductoCategoriaR[]>("/productos/productoCategoriaReporte");

export const listarProductosActivosFiltro = (nombre: string) =>
  api.get<Producto[]>("/productos/mostrarActivosFiltro", {
    params: { nombre },
  });
export const listarReporteProductoCategoria = () =>
  api.get<Producto[]>("/productos/reporteProductoCategoria");
export const graficaProductoCategoria = () =>
  api.get<ProductoCategoria[]>("/productos/graficaProductoCategoria");
export const crearProducto = (data: Omit<Producto, "idProducto">) =>
  api.post<Producto>("/productos", data);
export const actualizarProducto = (
  id: number,
  data: Omit<Producto, "idProducto">,
) => api.put<Producto>(`/productos/${id}`, data);
export const anularProducto = (id: number) =>
  api.put<Producto>(`/productos/anular/${id}`);
