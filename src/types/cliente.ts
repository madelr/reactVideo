export interface ClientePedido {
  nombreCliente: string;
  apellidoCliente: string;
  fechaPedido: Date;
}

export interface ClientePedidoDetalle{
  nombreCliente:string;
  apellidoCliente:string;
  fechaPedido:Date;
  cantidad:integer;
  nombreProducto:string;
  precio:bigDecimal;
  total:bigDecimal;
}
