import React, { useEffect, useState } from "react";
import episodiosService from "../../services/episodios.service";
import TablaEpisodios from "../Tablas/TablaEpisodios.jsx";

export default function ConsultaEpisodios() {
  const [episodios, setEpisodios] = useState([]);

  useEffect(() => {
    obtenerEpisodios();
  }, []);

  const obtenerEpisodios = async () => {
    try {
      const data = await episodiosService.getEpisodios();
      setEpisodios(data);
    } catch (error) {
      console.error("Error al obtener los episodios:", error);
    }
  };

  return (
    <div className="container m-5">
      <h3 className="text-center mb-4">
        Consulta, Modifica y Elimina Episodios
      </h3>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <i className="bi bi-exclamation-triangle"></i> En este apartado puedes
        realizar operaciones de <strong>Alta</strong>, <strong>Baja</strong>,{" "}
        <strong>Modificación</strong> y <strong>Consulta</strong> sobre la tabla{" "}
        <strong>Episodios</strong>. Por favor, editar con precaución.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <TablaEpisodios episodios={episodios} setEpisodios={setEpisodios} />
    </div>
  );
}
