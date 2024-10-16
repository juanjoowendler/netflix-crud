import React, { useState, useEffect } from "react";
import episodiosService from "../../services/episodios.service";
import seriesService from "../../services/series.service";
import temporadasService from "../../services/temporadas.service";
import EliminarEpisodio from "../Episodios/EliminarEpisodios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function TablaEpisodios({ episodios, setEpisodios }) {
  const [series, setSeries] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [episodioSeleccionado, setEpisodioSeleccionado] = useState(null);
  const [filtroNombreEpisodio, setFiltroNombreEpisodio] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const [success, setSuccess] = useState(""); // Estado para el mensaje de éxito
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const seriesData = await seriesService.getSeries();
        setSeries(seriesData);
      } catch (error) {
        console.error("Error al obtener las series:", error);
      }
    };

    const fetchTemporadas = async () => {
      try {
        const temporadasData = await temporadasService.getTemporadas();
        setTemporadas(temporadasData);
      } catch (error) {
        console.error("Error al obtener las temporadas:", error);
      }
    };

    fetchSeries();
    fetchTemporadas();
  }, []);

  const getNombreSerie = (serieId) => {
    const serie = series.find((s) => s.serie_id === serieId);
    return serie ? serie.nombre_serie : "Desconocido";
  };

  const getNumeroTemporada = (temporadaId) => {
    const temporada = temporadas.find((t) => t.temporada_id === temporadaId);
    return temporada ? temporada.numero_temporada : "Desconocido";
  };

  const handleEliminarEpisodio = async (episodioId) => {
    try {
      await episodiosService.eliminarEpisodio(episodioId);
      setEpisodios(
        episodios.filter((episodio) => episodio.episodio_id !== episodioId)
      );
      setSuccess("Episodio eliminado correctamente.");
      handleCloseEliminar();
    } catch (error) {
      console.error("Error al eliminar el episodio:", error);
      setError(
        "No se puede eliminar el episodios que tiene directores y/o actores asociados."
      );
      handleCloseEliminar();
    }
  };

  const handleMostrarEliminar = (episodioId) => {
    setEpisodioSeleccionado(episodioId);
    setMostrarEliminar(true);
  };

  const handleCloseEliminar = () => {
    setMostrarEliminar(false);
    setEpisodioSeleccionado(null);
  };

  const handleModificarClick = (id) => {
    navigate(`/modificar-episodio/${id}`);
  };

  return (
    <div>
      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
          {success}
        </Alert>
      )}

      <EliminarEpisodio
        show={mostrarEliminar}
        handleClose={handleCloseEliminar}
        handleEliminar={() => handleEliminarEpisodio(episodioSeleccionado)}
        episodioId={episodioSeleccionado}
      />
      <div className="mb-3 text-center">
        <div className="d-inline-flex">
          <input
            type="text"
            className="form-control me-2"
            id="filtroNombre"
            value={filtroNombreEpisodio}
            onChange={(e) => setFiltroNombreEpisodio(e.target.value)}
            placeholder="Introduce Nombre de Episodio"
          />
          <button className="btn btn-danger" onClick={() => {}}>
            Buscar
          </button>
        </div>
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre Serie</th>
            <th scope="col">Nº Temporada</th>
            <th scope="col">Nombre Episodio</th>
            <th scope="col">Duración</th>
            <th scope="col">Fecha de Emisión</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {episodios
            .filter((episodio) =>
              episodio.nombre_episodio
                .toLowerCase()
                .includes(filtroNombreEpisodio.toLowerCase())
            )
            .map((episodio) => (
              <tr key={episodio.episodio_id}>
                <td>{episodio.episodio_id}</td>
                <td>{episodio.serie_1.nombre_serie}</td>
                <td>{episodio.temporada.numero_temporada}º Temp.</td>
                <td>{episodio.nombre_episodio}</td>
                <td>{episodio.duracion_minutos} Min</td>
                <td>{new Date(episodio.fecha_emision).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleMostrarEliminar(episodio.episodio_id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleModificarClick(episodio.episodio_id)}
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
