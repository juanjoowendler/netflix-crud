import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaActores from "../Tablas/TablaActores.jsx";
import actoresService from "../../services/actores.service.js";

// CONSULTAR
const ConsultaActores = () => {
  const [actores, setActores] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    obtenerActores();
  }, []);

  const obtenerActores = async () => {
    try {
      const data = await actoresService.getActores();
      setActores(data);
    } catch (error) {
      console.error("Error al obtener los actores:", error);
    }
  };

  const handleFiltrar = async (event) => {
    event.preventDefault();
    try {
      const data = await actoresService.getActoresFiltrados(filtroNombre);
      setActores(data);
    } catch (error) {
      console.error("Error al filtrar los actores:", error);
    }
  };

  const handleChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  const handleActorEliminado = (actor_id) => {
    setActores((prevActores) =>
      prevActores.filter((actor) => actor.actor_id !== actor_id)
    );
  };

  const onReturn = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">
        Consulta, Modifica y Elimina Actores
      </h3>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <i className="bi bi-exclamation-triangle"></i> En este apartado puedes
        realizar operaciones de <strong>Alta</strong>, <strong>Baja</strong>,{" "}
        <strong>Modificación</strong> y <strong>Consulta</strong> sobre la tabla{" "}
        <strong>Actores</strong>. Por favor, editar con precaución.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div className="container d-flex justify-content-center my-2">
        <form className="mb-3 d-inline-flex" onSubmit={handleFiltrar}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Buscar por nombre..."
            value={filtroNombre}
            onChange={handleChange}
          />
          <button className="btn btn-danger" type="submit">
            Buscar
          </button>
        </form>
      </div>
      <TablaActores
        item={actores}
        onReturn={onReturn}
        onActorEliminado={handleActorEliminado}
      />
    </div>
  );
};

export default ConsultaActores;
