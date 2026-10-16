import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    listarProductosActivos,
    crearProducto,
    actualizarProducto,
    anularProducto
} from "../services/productoServices";
import type { Producto } from "../types/producto";

const formInicial: Producto = {
    idProducto: null,
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    idCategoria: null
};

const obtenerMensajeError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.mensaje ?? error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "Ocurrió un error inesperado";
};
function Productos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [form, setForm] = useState<Producto>(formInicial);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [mensaje, setMensaje] = useState("");


    const cargarProductos = async () => {
        try {
            const respuesta = await listarProductosActivos();
            setProductos(respuesta.data);
        } catch (error) {
            console.error("Error al listar productos", error);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (modoEdicion && form.idProducto !== null) {
                await actualizarProducto(form.idProducto, form);
                setMensaje("Producto actualizado correctamente");
            } else {
                await crearProducto(form);
                setMensaje("Producto creado correctamente");
            }
            setForm(formInicial);
            setModoEdicion(false);
            cargarProductos();
        } catch (error) {
            setMensaje(obtenerMensajeError(error));
            console.error("Error al guardar categoría", error);
        }
    };

    const handleModificar = (producto: Producto) => {
        setForm(producto);
        setModoEdicion(true);
    };
    const exportarPDF = () => {
        const doc = new jsPDF();

        // 1. Título del reporte
        doc.text("Listado de Categorías", 14, 15);

        // 2. Preparar los datos de la tabla
        const columnas = ["Nombre", "Descripcion"];
        const filas = productos.map((producto) => [
            /* ¿qué campos de "categoria" van en cada fila, y en qué orden? */
            producto.nombre,
            producto.descripcion
        ]);

        // 3. Dibujar la tabla
        autoTable(doc, {
            head: [columnas],
            body: filas,
            startY: 20, // para que no choque con el título
        });

        // 4. Descargar
        doc.save("productos.pdf");
    };
    const handleAnular = async (idProducto: number) => {
        const confirmar = window.confirm("¿Seguro que deseas anular este producto?");
        if (!confirmar) return;
        try {
            await anularProducto(idProducto);
            setMensaje("Producto anulado correctamente");
            cargarProductos();
        } catch (error) {
            setMensaje(obtenerMensajeError(error));
            console.error("Error al anular el producto", error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-10 font-times">
                <h2 className="p-10 text-2xl italic md:text-xl font-bold">Ingresar/Modificar Productos</h2>
                {mensaje && <p>{mensaje}</p>}
                <form onSubmit={handleSubmit} >
                    <div className="columns-3">
                        <div>
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" className="h-12 border border-gray-300" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="descripcion">Descripción:</label>
                            <input type="text" className="h-12 border border-gray-300" id="descripcion" name="descripcion" value={form.descripcion} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="descripcion">Precio:</label>
                            <input type="text" className="h-12 border border-gray-300" id="precio" name="precio" value={form.precio} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="descripcion">Stock:</label>
                            <input type="text" className="h-12 border border-gray-300" id="stock" name="stock" value={form.stock} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="p-10">
                        <button type="submit" className="p-10 h-12 animate-bounce bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
                            Guardar
                        </button>
                    </div>
                </form>
                <h2 className="h-12 text-2xl italic md:text-xl font-bold font-[Courier_New]">Listado de Productos</h2>
                <button onClick={exportarPDF} className="p-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Exportar a PDF
                </button>
                <table className="border-collapse:collapse; border: 1px solid black; width: 100%; margin-top: 20px;">
                    <thead>
                        <tr>
                            <th className="border border-gray-300">Nombre</th>
                            <th className="border border-gray-300">Descripción</th>
                            <th className="border border-gray-300">Precio</th>
                            <th className="border border-gray-300">Stock</th>
                            <th className="border border-gray-300">Modificar</th>
                            <th className="border border-gray-300">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.idProducto}>
                                <td className="text-center border border-gray-300">{producto.nombre}</td>
                                <td className="text-center border border-gray-300">{producto.descripcion}</td>
                                <td className="text-center border border-gray-300">{producto.precio}</td>
                                <td className="text-center border border-gray-300">{producto.stock}</td>
                                <td className="text-center border border-gray-300">
                                    <button onClick={() => handleModificar(producto)} className="animate-pulse transition bg-yellow-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">Modificar</button>
                                </td>
                                <td className="text-center border border-gray-300">
                                    <button onClick={() => producto.idProducto !== null && handleAnular(producto.idProducto)} className="animate-pulse bg-red-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Productos;