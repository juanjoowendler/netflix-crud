import React, { useState, useEffect } from "react";
import episodiosService from "../../services/episodios.service";
import seriesService from "../../services/series.service";
import temporadasService from "../../services/temporadas.service";
import { useNavigate } from "react-router-dom";

export default function RegistrarEpisodio() {
  const [nombreEpisodio, setNombreEpisodio] = useState("");
  const [duracionMinutos, setDuracionMinutos] = useState("");
  const [fechaEmision, setFechaEmision] = useState("");
  const [serieId, setSerieId] = useState("");
  const [temporadaId, setTemporadaId] = useState("");
  const [series, setSeries] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [temporadasFiltradas, setTemporadasFiltradas] = useState([]);
  const [errorNombreEpisodio, setErrorNombreEpisodio] = useState(null);
  const [errorDuracionMinutos, setErrorDuracionMinutos] = useState(null);
  const [errorFechaEmision, setErrorFechaEmision] = useState(null);
  const [errorSerieId, setErrorSerieId] = useState(null);
  const [errorTemporadaId, setErrorTemporadaId] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null); // Estado para mensaje de éxito
  const [mensajeError, setMensajeError] = useState(null); // Estado para mensaje de error

  const navigate = useNavigate();

  // Cargar series y temporadas al cargar el componente
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const seriesData = await seriesService.getSeries();
        setSeries(seriesData);
      } catch (error) {
        console.error("Error al obtener las series:", error);
        mostrarMensajeError("Error al obtener las series.");
      }
    };

    const fetchTemporadas = async () => {
      try {
        const temporadasData = await temporadasService.getTemporadas();
        setTemporadas(temporadasData);
      } catch (error) {
        console.error("Error al obtener las temporadas:", error);
        mostrarMensajeError("Error al obtener las temporadas.");
      }
    };

    fetchSeries();
    fetchTemporadas();
  }, []);

  // Filtrar temporadas cuando cambia la serie seleccionada
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

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar campos requeridos
    if (!nombreEpisodio) {
      setErrorNombreEpisodio("Este campo es requerido.");
      return;
    } else {
      setErrorNombreEpisodio(null);
    }

    if (!duracionMinutos) {
      setErrorDuracionMinutos("Este campo es requerido.");
      return;
    } else {
      setErrorDuracionMinutos(null);
    }

    if (!fechaEmision) {
      setErrorFechaEmision("Este campo es requerido.");
      return;
    } else {
      setErrorFechaEmision(null);
    }

    if (!serieId) {
      setErrorSerieId("Este campo es requerido.");
      return;
    } else {
      setErrorSerieId(null);
    }

    if (!temporadaId) {
      setErrorTemporadaId("Este campo es requerido.");
      return;
    } else {
      setErrorTemporadaId(null);
    }

    // Si todos los campos requeridos están completos, proceder con el envío del formulario
    const newEpisodio = {
      nombre_episodio: nombreEpisodio,
      duracion_minutos: parseInt(duracionMinutos),
      fecha_emision: fechaEmision,
      serie_id: parseInt(serieId),
      temporada_id: parseInt(temporadaId),
    };

    try {
      await episodiosService.postEpisodio(newEpisodio);
      mostrarMensajeExito("Episodio registrado correctamente.");
      setTimeout(() => navigate("/lista-episodios"), 500); // Redirigir a la lista de episodios después de registrar
    } catch (error) {
      console.error("Error al registrar el episodio:", error);
      mostrarMensajeError(
        "Error al registrar el episodio. Inténtalo nuevamente."
      );
    }
  };

  // Función para limpiar los campos del formulario
  const handleLimpiar = () => {
    setNombreEpisodio("");
    setDuracionMinutos("");
    setFechaEmision("");
    setSerieId("");
    setTemporadaId("");
    setTemporadasFiltradas([]);
    // Limpiar errores al limpiar el formulario
    setErrorNombreEpisodio(null);
    setErrorDuracionMinutos(null);
    setErrorFechaEmision(null);
    setErrorSerieId(null);
    setErrorTemporadaId(null);
  };

  const mostrarMensajeExito = (texto) => {
    setMensajeExito(texto);
    setTimeout(() => {
      setMensajeExito(null);
    }, 2000); // Desaparece el mensaje de éxito después de 2 segundos
  };

  const mostrarMensajeError = (texto) => {
    setMensajeError(texto);
    setTimeout(() => {
      setMensajeError(null);
    }, 2000); // Desaparece el mensaje de error después de 2 segundos
  };

  return (
    <div className="container">
      <h3 className="text-center mt-5">Registrar un Episodio</h3>
      <div className="border p-4 mx-auto mt-3" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombreEpisodio" className="form-label">
              Nombre del Episodio
            </label>
            <input
              type="text"
              className={`form-control ${
                errorNombreEpisodio ? "is-invalid" : ""
              }`}
              id="nombreEpisodio"
              value={nombreEpisodio}
              onChange={(e) => setNombreEpisodio(e.target.value)}
              required
            />
            {errorNombreEpisodio && (
              <div className="invalid-feedback">{errorNombreEpisodio}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="duracionMinutos" className="form-label">
              Duración (minutos)
            </label>
            <input
              type="number"
              min="1"
              step="any"
              className={`form-control ${
                errorDuracionMinutos ? "is-invalid" : ""
              }`}
              id="duracionMinutos"
              value={duracionMinutos}
              onChange={(e) => setDuracionMinutos(e.target.value)}
              required
            />
            {errorDuracionMinutos && (
              <div className="invalid-feedback">{errorDuracionMinutos}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="fechaEmision" className="form-label">
              Fecha de Emisión
            </label>
            <input
              type="date"
              className={`form-control ${
                errorFechaEmision ? "is-invalid" : ""
              }`}
              id="fechaEmision"
              value={fechaEmision}
              onChange={(e) => setFechaEmision(e.target.value)}
              required
            />
            {errorFechaEmision && (
              <div className="invalid-feedback">{errorFechaEmision}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="serieId" className="form-label">
              Serie
            </label>
            <select
              className={`form-select ${errorSerieId ? "is-invalid" : ""}`}
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
            {errorSerieId && (
              <div className="invalid-feedback">{errorSerieId}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="temporadaId" className="form-label">
              Temporada
            </label>
            <select
              className={`form-select ${errorTemporadaId ? "is-invalid" : ""}`}
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
                  {temporada.numero_temporada}º Temp.{temporada.nombre_serie}
                </option>
              ))}
            </select>
            {errorTemporadaId && (
              <div className="invalid-feedback">{errorTemporadaId}</div>
            )}
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary mx-1">
              Registrar
            </button>
            <button
              type="button"
              className="btn btn-primary mx-1"
              onClick={handleLimpiar}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>

      {/* Mensaje de éxito */}
      {mensajeExito && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 999 }}>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {mensajeExito}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMensajeExito(null)}
            ></button>
          </div>
        </div>
      )}

      {/* Mensaje de error */}
      {mensajeError && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 999 }}>
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {mensajeError}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMensajeError(null)}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}
