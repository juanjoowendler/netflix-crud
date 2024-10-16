import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EliminarActores from "../Actores/EliminarActores.jsx";
import episodiosService from "../../services/episodios.service.js";

export default function TablaActores({ item, onActorEliminado }) {
  const [episodios, setEpisodios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [actorToDelete, setActorToDelete] = useState(null);

  useEffect(() => {
    const cargarEpisodios = async () => {
      try {
        const listaEpisodios = await episodiosService.getEpisodios();
        setEpisodios(listaEpisodios);
      } catch (error) {
        console.error("Error al cargar los episodios", error);
      }
    };

    cargarEpisodios();
  }, []);

  const obtenerNombreEpisodio = (episodio_id) => {
    const episodio = episodios.find((e) => e.episodio_id === episodio_id);
    return episodio ? episodio.nombre_episodio : "Desconocido";
  };

  const handleShowModal = (actor_id) => {
    setActorToDelete(actor_id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActorToDelete(null);
  };

  const handleDeleteActor = (actor_id) => {
    onActorEliminado(actor_id);
    handleCloseModal();
  };

  return (
    <div className="d-flex justify-content-center m-5">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Fecha de Nacimiento</th>
            <th scope="col">Episodio(s)</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {item &&
            item.map((actor) => (
              <tr key={actor.actor_id}>
                <th scope="row">{actor.actor_id}</th>
                <td>{actor.nombre_actor}</td>
                <td>{actor.fecha_nacimiento}</td>
                <td>{actor.episodio.nombre_episodio}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowModal(actor.actor_id)}
                  >
                    Eliminar
                  </button>
                  <Link
                    className="btn btn-primary ms-2"
                    to={`/modificar-actor/${actor.actor_id}`}
                  >
                    Modificar
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {actorToDelete && (
        <EliminarActores
          id={actorToDelete}
          show={showModal}
          handleClose={handleCloseModal}
          onDeleteActor={handleDeleteActor}
        />
      )}
    </div>
  );
}
