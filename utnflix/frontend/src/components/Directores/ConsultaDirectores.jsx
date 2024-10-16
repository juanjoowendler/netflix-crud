import React, { useEffect, useState } from "react";
import service from "../../services/directores.service.js";
import TablaDirectores from "../Tablas/TablaDirectores.jsx";
import episodiosService from "../../services/episodios.service.js";

export default function ConsultaDirectores() {
  const [directores, setDirectores] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");

  useEffect(() => {
    obtenerDirectores();
  }, []);


  const obtenerDirectores = async () => {
    try {
      const data = await service.getDirectores();
      setDirectores(data);
    } catch (error) {
      console.error("Error al obtener los directores:", error);
    }
  };

  const handleFiltrar = async () => {
    try {
      const data = await service.getDirectoresFiltrados(filtroNombre);
      setDirectores(data);
    } catch (error) {
      console.error("Error al filtrar los directores:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleFiltrar();
    } catch (error) {
      console.error("Error al filtrar los directores:", error);
    }
  };

  const handleChange = (event) => {
    setFiltroNombre(event.target.value);
  };


  return (
    <div className="container m-5">
      <h3 className="text-center mb-4">
        Consulta, Modifica y Elimina Directores
      </h3>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <i className="bi bi-exclamation-triangle"></i> En este apartado puedes
        realizar operaciones de <strong>Alta</strong>, <strong>Baja</strong>,{" "}
        <strong>Modificación</strong> y <strong>Consulta</strong> sobre la tabla{" "}
        <strong>Directores</strong>. Por favor, editar con precaución.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div className="text-center mb-4">
        <form className="mb-3 d-inline-flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Buscar por nombre de director"
            value={filtroNombre}
            onChange={handleChange}
          />
          <button className="btn btn-danger" type="submit">
            Buscar
          </button>
        </form>
      </div>
      <TablaDirectores directores={directores} setDirectores={setDirectores} />
    </div>
  );
}
