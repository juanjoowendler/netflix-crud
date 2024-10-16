import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/temporadas.service";
import seriesService from "../../services/series.service";
import EliminarTemporadas from "../Temporadas/EliminarTemporadas"; 
import { Alert } from "react-bootstrap"; // Asegúrate de importar el componente Alert

const TablaTemporadas = ({ temporadas, handleFiltrar }) => {
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [temporadaSeleccionada, setTemporadaSeleccionada] = useState(null);
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const [success, setSuccess] = useState(""); // Estado para el mensaje de éxito
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [filtroNombreSerie, setFiltroNombreSerie] = useState("");

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await seriesService.getSeries();
        setSeries(data);
      } catch (error) {
        console.error("Error al obtener las series:", error);
      }
    };

    fetchSeries();
  }, []);

  const handleEliminarTemporada = async (temporadaId) => {
    try {
      await service.eliminarTemporada(temporadaId);
      console.log("Temporada eliminada correctamente");
      setSuccess("Temporada eliminada correctamente."); // Establecer el mensaje de éxito
      handleFiltrar(); // Actualizar la lista de temporadas después de eliminar
      handleCloseEliminar();
    } catch (error) {
      console.error("Error al eliminar la temporada:", error);
      setError("No se puede eliminar la temporada porque contiene episodios."); // Establecer el mensaje de error
      handleCloseEliminar(); // Cerrar el modal en caso de error también
    }
  };

  const handleMostrarEliminar = (temporadaId) => {
    setTemporadaSeleccionada(temporadaId);
    setMostrarEliminar(true);
  };

  const handleCloseEliminar = () => {
    setMostrarEliminar(false);
    setTemporadaSeleccionada(null);
  };

  const handleModificarClick = (id) => {
    navigate(`/modificar-temporada/${id}`);
  };

  const getNombreSeries = (serieId) => {
    const serie = series.find((s) => s.serie_id === serieId);
    return serie ? serie.nombre_serie : "Desconocido";
  };

  const handleFiltroNombreSerie = (event) => {
    setFiltroNombreSerie(event.target.value);
  };

  let temporadasFiltradas = temporadas;
  if (filtroNombreSerie) {
    temporadasFiltradas = temporadas.filter((temporada) =>
      getNombreSeries(temporada.serie_id)
        .toLowerCase()
        .includes(filtroNombreSerie.toLowerCase())
    );
  }

  const handleEliminar = () => {
    if (temporadaSeleccionada) {
      handleEliminarTemporada(temporadaSeleccionada);
    }
  };

  return (
    <div>
      <div className="mb-3 text-center">
        <div className="d-inline-flex">
          <input
            type="text"
            className="form-control me-2"
            id="filtroNombreSerie"
            value={filtroNombreSerie}
            onChange={handleFiltroNombreSerie}
            placeholder="Introduce Nombre de Serie"
          />
          <button className="btn btn-danger" onClick={handleFiltrar}>
            Buscar
          </button>
        </div>
      </div>

      {error && ( // Mostrar el mensaje de error si existe
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {success && ( // Mostrar el mensaje de éxito si existe
        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
          {success}
        </Alert>
      )}

      <EliminarTemporadas
        temporadaId={temporadaSeleccionada}
        show={mostrarEliminar}
        handleClose={handleCloseEliminar}
        handleEliminar={handleEliminar}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID Temporada</th>
            <th scope="col">Nombre Serie</th>
            <th scope="col">Nº Temporada</th>
            <th scope="col">Fecha de Lanzamiento</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {temporadasFiltradas.length > 0 ? (
            temporadasFiltradas.map((temporada) => (
              <tr key={temporada.temporada_id}>
                <th scope="row">{temporada.temporada_id}</th>
                <td>{temporada.serie.nombre_serie}</td>
                <td>{temporada.numero_temporada}º Temp.</td>
                <td>{temporada.fecha_lanzamiento}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleMostrarEliminar(temporada.temporada_id)
                    }
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleModificarClick(temporada.temporada_id)}
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No se encontraron temporadas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaTemporadas;
