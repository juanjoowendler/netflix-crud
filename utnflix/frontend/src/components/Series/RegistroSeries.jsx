import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import service from "../../services/series.service.js";
import generosService from "../../services/generos.service";

const Registro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [series, setSeries] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [generos, setGeneros] = useState([]);
  const [mensajeExito, setMensajeExito] = useState(null); // Estado para mensaje de éxito
  const [mensajeError, setMensajeError] = useState(null); // Estado para mensaje de error
  const fechaActual = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const data = await generosService.getGeneros();
        setGeneros(data);
      } catch (error) {
        console.error("Error al obtener los géneros:", error);
      }
    };

    fetchGeneros();
  }, []);

  useEffect(() => {
    const obtenerSeries = async () => {
      try {
        const data = await service.getSeries();
        setSeries(data);
      } catch (error) {
        console.error("Error al obtener las series:", error);
      }
    };
    obtenerSeries();
  }, []);

  const onSubmit = async (data) => {
    try {
      await service.postSeries(data);
      const updatedSeries = await service.getSeries();
      setSeries(updatedSeries);
      reset();
      mostrarMensajeExito("Serie registrada correctamente."); // Mostrar mensaje de éxito
    } catch (error) {
      console.error("Error al registrar la serie:", error);
      mostrarMensajeError("Error al registrar la serie. Inténtalo nuevamente."); // Mostrar mensaje de error
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
    <div className="container m-5">
      <h3 className="text-center mb-4">Registrar una Serie</h3>
      {/* Formulario de registro */}
      <div className="d-flex justify-content-center">
        <div className="card p-4" style={{ maxWidth: "600px", width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre de la Serie */}
            <div className="mb-3">
              <label htmlFor="nombre_serie" className="form-label">
                Nombre de la Serie:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre_serie"
                {...register("nombre_serie", {
                  required: "Este campo es requerido",
                  maxLength: {
                    value: 20,
                    message:
                      "El nombre de la serie no puede tener más de 20 caracteres",
                  },
                })}
              />
              {errors.nombre_serie && (
                <span className="text-danger small">
                  {errors.nombre_serie.message}
                </span>
              )}
            </div>
            {/* Fecha de Estreno */}
            <div className="mb-3">
              <label htmlFor="fecha_estreno" className="form-label">
                Fecha de Estreno:
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha_estreno"
                {...register("fecha_estreno", {
                  required: "Este campo es requerido",
                })}
                max={fechaActual}
              />
              {errors.fecha_estreno && (
                <span className="text-danger small">
                  {errors.fecha_estreno.message}
                </span>
              )}
            </div>
            {/* Género */}
            <div className="mb-3">
              <label htmlFor="genero_id" className="form-label">
                Género:
              </label>
              <select
                className="form-control"
                id="genero_id"
                {...register("genero_id", {
                  required: "Este campo es requerido",
                })}
              >
                <option value="">Selecciona un género</option>
                {generos.map((genero) => (
                  <option key={genero.genero_id} value={genero.genero_id}>
                    {genero.nombre_genero}
                  </option>
                ))}
              </select>
              {errors.genero_id && (
                <span className="text-danger small">
                  {errors.genero_id.message}
                </span>
              )}
            </div>
            {/* Descripción */}
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción:
              </label>
              <textarea
                className="form-control"
                id="descripcion"
                {...register("descripcion", {
                  required: "Este campo es requerido",
                  maxLength: {
                    value: 200,
                    message:
                      "La descripcion no puede exceder los 200 caracteres",
                  },
                })}
              ></textarea>
              {errors.descripcion && (
                <span className="text-danger small">
                  {errors.descripcion.message}
                </span>
              )}
            </div>
            {/* URL de Imagen */}
            <div className="mb-3">
              <label htmlFor="imagenUrl" className="form-label">
                URL de Imagen:
              </label>
              <input
                type="text"
                className="form-control"
                id="imagenUrl"
                {...register("imagenUrl", {
                  required: "Este campo es requerido",
                })}
              />
              {errors.imagenUrl && (
                <span className="text-danger small">
                  {errors.imagenUrl.message}
                </span>
              )}
            </div>
            {/* Botones */}
            <div className="text-center mt-4">
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
