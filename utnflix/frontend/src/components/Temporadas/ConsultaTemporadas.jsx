import { useEffect, useState } from "react";
import service from "../../services/temporadas.service.js";
import TablaTemporadas from "../Tablas/TablaTemporadas.jsx";

export default function ConsultaTemporadas() {
  const [temporadas, setTemporadas] = useState([]);
  const [filtroIdSerie, setFiltroIdSerie] = useState("");

  useEffect(() => {
    obtenerTemporadas();
  }, []);

  const obtenerTemporadas = async () => {
    try {
      const data = await service.getTemporadas();
      setTemporadas(data);
    } catch (error) {
      console.error("Error al obtener las temporadas:", error);
    }
  };

  const handleFiltrar = async () => {
    try {
      const data = await service.getTemporadasFiltradas(filtroIdSerie);
      setTemporadas(data);
    } catch (error) {
      console.error("Error al filtrar las temporadas:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleFiltrar();
    } catch (error) {
      console.error("Error al filtrar las temporadas:", error);
    }
  };

  const handleChange = (event) => {
    setFiltroIdSerie(event.target.value);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Consulta, Modifica y Elimina Temporadas</h3>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <i className="bi bi-exclamation-triangle"></i> En este apartado puedes
        realizar operaciones de <strong>Alta</strong>, <strong>Baja</strong>,{" "}
        <strong>Modificación</strong> y <strong>Consulta</strong> sobre la tabla{" "}
        <strong>Temporadas</strong>. Por favor, editar con precaución.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <TablaTemporadas temporadas={temporadas} handleFiltrar={handleFiltrar} />
    </div>
  );
}
