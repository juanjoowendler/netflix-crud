import { useEffect, useState } from "react";
import service from "../../services/series.service.js";
import TablaSeries from "../Tablas/TablaSeries.jsx";

export default function Consulta() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    obtenerSeries();
  }, []);

  const obtenerSeries = async () => {
    try {
      const data = await service.getSeries();
      setSeries(data);
    } catch (error) {
      console.error("Error al obtener las series:", error);
    }
  };

  const handleFiltrar = async (filtroNombre) => {
    try {
      const data = await service.getSeriesFiltrados(filtroNombre);
      setSeries(data);
    } catch (error) {
      console.error("Error al filtrar las series:", error);
    }
  };

  return (
    <div className="container m-5">
      <h3 className="text-center mb-4">Consulta, Modifica y Elimina Series</h3>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <i className="bi bi-exclamation-triangle"></i> En este apartado puedes
        realizar operaciones de <strong>Alta</strong>, <strong>Baja</strong>,{" "}
        <strong>Modificación</strong> y <strong>Consulta</strong> sobre la tabla{" "}
        <strong>Series</strong>. Por favor, editar con precaución.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <TablaSeries series={series} handleFiltrar={handleFiltrar} />
    </div>
  );
}
