import { useState, useEffect, type ChangeEvent } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    listarCategoriasActivasFiltro
} from "../services/categoriaServices";
import {
    listarProductosActivos,
    graficaProductoCategoria,
} from "../services/productoServices";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

import type { Categoria } from "../types/categoria";
import type { Producto } from "../types/producto";
import type { ProductoCategoria } from "../types/producto";
function Graficas2() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [datosPastel, setDatosPastel] = useState<ProductoCategoria[]>([]);


    const cargarProductos = async () => {
        try {
            const respuesta = await listarProductosActivos();
            setProductos(respuesta.data);
        } catch (error) {
            console.error("Error al listar productos", error);
        }
    };

    const cargarDatosPastel = async () => {
        try {
            const respuesta = await graficaProductoCategoria();
            setDatosPastel(respuesta.data);
        } catch (error) {
            console.error("Error al cargar datos para la gráfica de pastel", error);
        }
    };

    useEffect(() => {
        cargarProductos();
        cargarDatosPastel();
    }, []);
    const COLORES = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-10 font-times">
                <h2 className="p-10 text-2xl italic md:text-xl font-bold">Reportes</h2>
                <form >
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={productos}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nombre" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="stock" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={productos}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nombre" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="precio" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={datosPastel} dataKey="cantidad" nameKey="categoria" label>
                                {datosPastel.map((_, i) => (
                                    <Cell key={i} fill={COLORES[i % COLORES.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </form>
            </div>
        </div>
    )
}
export default Graficas2;