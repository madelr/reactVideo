import api from "../api/axios";
import type { ClientePedido } from "../types/cliente";
export const listarReporteClientePedido = () =>
  api.get<ClientePedido[]>("/clientes/reporteClientePedido");
export const listarReporteClientePedidoDetalle=()=>
  api.get<ClientePedidoDetalle[]>("clientes/reporteClientePedidoDetalle");

