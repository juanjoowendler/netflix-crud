import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/generos.service";
import EliminarGeneros from "../Generos/EliminarGeneros";

const TablaGeneros = ({ generos, handleFiltrar }) => {
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
  const navigate = useNavigate();

  const handleEliminarGenero = async (generoId) => {
    try {
      await service.eliminarGenero(generoId);
      console.log("Género eliminado correctamente");
      handleFiltrar();
      handleCloseEliminar();
    } catch (error) {
      console.error("Error al eliminar el género:", error);
    }
  };

  const handleMostrarEliminar = (generoId) => {
    setGeneroSeleccionado(generoId);
    setMostrarEliminar(true);
  };

  const handleCloseEliminar = () => {
    setMostrarEliminar(false);
    setGeneroSeleccionado(null);
  };

  const handleModificarClick = (id) => {
    navigate(`/modificar-genero/${id}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="w-75">
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">ID Género</th>
              <th scope="col">Nombre</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {generos &&
              generos.map((genero) => (
                <tr key={genero.genero_id}>
                  <th scope="row">{genero.genero_id}</th>
                  <td>{genero.nombre_genero}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleMostrarEliminar(genero.genero_id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleModificarClick(genero.genero_id)}
                    >
                      Modificar
                    </button>
                  </td>
                </tr>
              ))}
            {!generos.length && (
              <tr>
                <td colSpan="3" className="text-center">
                  No se encontraron géneros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EliminarGeneros
        generoId={generoSeleccionado}
        show={mostrarEliminar}
        handleClose={handleCloseEliminar}
        handleEliminar={handleEliminarGenero}
      />
    </div>
  );
};

export default TablaGeneros;
