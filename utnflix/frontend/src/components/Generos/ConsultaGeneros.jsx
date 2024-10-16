import React, { useEffect, useState } from "react";
import service from "../../services/generos.service.js";
import TablaGeneros from "../Tablas/TablaGeneros.jsx";

export default function ConsultaGeneros() {
  const [generos, setGeneros] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");

  useEffect(() => {
    obtenerGeneros();
  }, []);

  const obtenerGeneros = async () => {
    try {
      const data = await service.getGenerosFiltrados(filtroNombre);
      setGeneros(data);
    } catch (error) {
      console.error("Error al obtener los géneros:", error);
    }
  };

  const handleFiltrar = async () => {
    try {
      const data = await service.getGenerosFiltrados(filtroNombre);
      setGeneros(data);
    } catch (error) {
      console.error("Error al filtrar los géneros:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleFiltrar();
    } catch (error) {
      console.error("Error al filtrar los géneros:", error);
    }
  };

  const handleChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  return (
    <div className="container m-5">
      <h3 className="text-center mb-4">
        Consulta, Modifica y Elimina Generos
      </h3>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <i className="bi bi-exclamation-triangle"></i> En este apartado puedes
        realizar operaciones de <strong>Alta</strong>, <strong>Baja</strong>,{" "}
        <strong>Modificación</strong> y <strong>Consulta</strong> sobre la tabla{" "}
        <strong>Generos</strong>. Por favor, editar con precaución.
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
            placeholder="Buscar por nombre de género"
            value={filtroNombre}
            onChange={handleChange}
          />
          <button className="btn btn-danger" type="submit">
            Buscar
          </button>
        </form>
      </div>
      <TablaGeneros generos={generos} handleFiltrar={handleFiltrar} />
    </div>
  );
}
