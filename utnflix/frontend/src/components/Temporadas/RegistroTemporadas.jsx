import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import service from "../../services/temporadas.service.js";
import serviceSeries from "../../services/series.service.js";

const Registro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [temporada, setTemporadas] = useState([]);
  const [series, setSeries] = useState([]);
  const [mensajeExito, setMensajeExito] = useState(null); // Estado para mensaje de éxito
  const [mensajeError, setMensajeError] = useState(null); // Estado para mensaje de error
  const fechaActual = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const obtenerTemporadas = async () => {
      try {
        const data = await service.getTemporadas();
        setTemporadas(data);
      } catch (error) {
        console.error("Error al obtener las temporadas:", error);
        mostrarMensajeError("Error al obtener las temporadas.");
      }
    };
    obtenerTemporadas();
  }, []);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await serviceSeries.getSeries();
        setSeries(data);
      } catch (error) {
        console.error("Error al obtener las series:", error);
        mostrarMensajeError("Error al obtener las series.");
      }
    };

    fetchSeries();
  }, []);

  const onSubmit = async (data) => {
    try {
      await service.postTemporada(data);
      const updatedTemporadas = await service.getTemporadas();
      setTemporadas(updatedTemporadas);
      reset();
      mostrarMensajeExito("Temporada registrada correctamente.");
    } catch (error) {
      console.error("Error al registrar la temporada:", error);
      mostrarMensajeError(
        "Error al registrar la temporada. Inténtalo nuevamente."
      );
    }
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
    <div className="container my-5">
      <h3 className="text-center mb-3">Registrar una temporada</h3>
      {/* Formulario de registro */}
      <div className="d-flex justify-content-center">
        <div className="card p-3" style={{ maxWidth: "400px", width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Numero de la Temporada */}
            <div className="mb-2">
              <label htmlFor="numero_temporada" className="form-label">
                Numero de la temporada:
              </label>
              <input
                type="number"
                min="1"
                step="any"
                className="form-control"
                id="numero_temporada"
                {...register("numero_temporada", {
                  required: "Este campo es requerido",
                })}
              />
              {errors.numero_temporada && (
                <span className="text-danger small">
                  {errors.numero_temporada.message}
                </span>
              )}
            </div>
            {/* Fecha de Lanzamiento */}
            <div className="mb-2">
              <label htmlFor="fecha_lanzamiento" className="form-label">
                Fecha de Lanzamiento:
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha_lanzamiento"
                {...register("fecha_lanzamiento", {
                  required: "Este campo es requerido",
                })}
                max={fechaActual}
              />
              {errors.fecha_lanzamiento && (
                <span className="text-danger small">
                  {errors.fecha_lanzamiento.message}
                </span>
              )}
            </div>
            {/* Serie */}
            <div className="mb-2">
              <label htmlFor="serie_id" className="form-label">
                Serie:
              </label>
              <select
                className="form-select"
                id="serie_id"
                {...register("serie_id", {
                  required: "Selecciona una serie",
                })}
              >
                <option value="">Selecciona una serie</option>
                {series.map((serie) => (
                  <option key={serie.serie_id} value={serie.serie_id}>
                    {serie.nombre_serie}
                  </option>
                ))}
              </select>
              {errors.serie_id && (
                <span className="text-danger small">
                  {errors.serie_id.message}
                </span>
              )}
            </div>
            {/* Botones */}
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary mx-1">
                Registrar
              </button>
              <button
                type="reset"
                className="btn btn-primary mx-1"
                onClick={() => reset()}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
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
};

export default Registro;
