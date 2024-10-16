import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EliminarDirector from "../Directores/EliminarDirectores";
import episodiosService from "../../services/episodios.service";
import directoresService from "../../services/directores.service";

const TablaDirectores = ({ directores, setDirectores }) => {
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [directorSeleccionado, setDirectorSeleccionado] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEpisodios = async () => {
      try {
        const episodiosData = await episodiosService.getEpisodios();
        setEpisodios(episodiosData);
      } catch (error) {
        console.error("Error al obtener episodios:", error);
      }
    };

    fetchEpisodios();
  }, []);

  const handleEditarDirector = (id) => {
    navigate(`/modificar-director/${id}`);
  };

  const handleMostrarEliminar = (id) => {
    setDirectorSeleccionado(id);
    setMostrarEliminar(true);
  };

  const handleCloseEliminar = () => {
    setMostrarEliminar(false);
    setDirectorSeleccionado(null);
  };

  const onDeleteDirector = (id) => {
    const updatedDirectores = directores.filter(
      (director) => director.director_id !== id
    );
    setDirectores(updatedDirectores);
    handleCloseEliminar();
  };

  const obtenerNombreEpisodio = (episodio_id) => {
    const episodio = episodios.find((e) => e.episodio_id === episodio_id);
    return episodio ? episodio.nombre_episodio : "Desconocido";
  };

  return (
    <div className="d-flex justify-content-center">
      <table className="table table-striped w-75">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Nacionalidad</th>
            <th>Episodio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((director) => (
            <tr key={director.director_id}>
              <td>{director.director_id}</td>
              <td>{director.nombre_director}</td>
              <td>{director.nacionalidad}</td>
              <td>{director.episodio_1.nombre_episodio}</td>
              <td>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => handleEditarDirector(director.director_id)}
                >
                  Modificar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleMostrarEliminar(director.director_id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {directorSeleccionado && (
        <EliminarDirector
          id={directorSeleccionado}
          show={mostrarEliminar}
          handleClose={handleCloseEliminar}
          onDeleteDirector={onDeleteDirector}
        />
      )}
    </div>
  );
};

export default TablaDirectores;
