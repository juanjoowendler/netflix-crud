import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import episodiosService from "../../services/episodios.service";
import seriesService from "../../services/series.service";
import temporadasService from "../../services/temporadas.service";

export default function EditarEpisodio() {
  const { id } = useParams(); // Obtenemos el id del episodio desde la URL
  const [nombreEpisodio, setNombreEpisodio] = useState("");
  const [duracionMinutos, setDuracionMinutos] = useState("");
  const [fechaEmision, setFechaEmision] = useState("");
  const [serieId, setSerieId] = useState("");
  const [temporadaId, setTemporadaId] = useState("");
  const [series, setSeries] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [temporadasFiltradas, setTemporadasFiltradas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEpisodio = async () => {
      try {
        const episodioData = await episodiosService.obtenerEpisodioPorId(id);
        setNombreEpisodio(episodioData.nombre_episodio);
        setDuracionMinutos(episodioData.duracion_minutos.toString());
        setFechaEmision(
          new Date(episodioData.fecha_emision).toISOString().split("T")[0]
        );
        setSerieId(episodioData.serie_id.toString());
        setTemporadaId(episodioData.temporada_id.toString());
      } catch (error) {
        console.error("Error al obtener el episodio:", error);
      }
    };

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

    if (id) {
      fetchEpisodio();
    }
    fetchSeries();
    fetchTemporadas();
  }, [id]);

  useEffect(() => {
    if (serieId) {
      const filteredTemporadas = temporadas.filter(
        (temporada) => temporada.serie_id === parseInt(serieId)
      );
      setTemporadasFiltradas(filteredTemporadas);
    } else {
      setTemporadasFiltradas([]);
    }
  }, [serieId, temporadas]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedEpisodio = {
      nombre_episodio: nombreEpisodio,
      duracion_minutos: parseInt(duracionMinutos),
      fecha_emision: fechaEmision,
      serie_id: parseInt(serieId),
      temporada_id: parseInt(temporadaId),
    };

    try {
      await episodiosService.actualizarEpisodio(id, updatedEpisodio);
      navigate("/lista-episodios"); // Redirigir a la lista de episodios después de actualizar
    } catch (error) {
      console.error("Error al actualizar el episodio:", error);
    }
  };

  const handleReset = () => {
    setNombreEpisodio("");
    setDuracionMinutos("");
    setFechaEmision("");
    setSerieId("");
    setTemporadaId("");
    setTemporadasFiltradas([]);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-lg-6 col-md-8 col-sm-10">
        <div className="card mx-3 my-5">
          <div className="card-body">
            <h2 className="text-center my-4">Modificar un Episodio</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombreEpisodio" className="form-label">
                  Nombre del Episodio
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreEpisodio"
                  value={nombreEpisodio}
                  onChange={(e) => setNombreEpisodio(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="duracionMinutos" className="form-label">
                  Duración (minutos)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="duracionMinutos"
                  value={duracionMinutos}
                  onChange={(e) => setDuracionMinutos(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fechaEmision" className="form-label">
                  Fecha de Emisión
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaEmision"
                  value={fechaEmision}
                  onChange={(e) => setFechaEmision(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="serieId" className="form-label">
                  Serie
                </label>
                <select
                  className="form-select"
                  id="serieId"
                  value={serieId}
                  onChange={(e) => setSerieId(e.target.value)}
                  required
                >
                  <option value="">Selecciona una serie</option>
                  {series.map((serie) => (
                    <option key={serie.serie_id} value={serie.serie_id}>
                      {serie.nombre_serie}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="temporadaId" className="form-label">
                  Temporada
                </label>
                <select
                  className="form-select"
                  id="temporadaId"
                  value={temporadaId}
                  onChange={(e) => setTemporadaId(e.target.value)}
                  required
                  disabled={!serieId} // Deshabilitar si no se ha seleccionado una serie
                >
                  <option value="">Selecciona una temporada</option>
                  {temporadasFiltradas.map((temporada) => (
                    <option
                      key={temporada.temporada_id}
                      value={temporada.temporada_id}
                    >
                      {temporada.numero_temporada}ª Temp. -{" "}
                      {temporada.nombre_serie}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary mx-1">
                  Modificar
                </button>
                <button
                  type="reset"
                  className="btn btn-primary mx-1"
                  onClick={handleReset}
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
