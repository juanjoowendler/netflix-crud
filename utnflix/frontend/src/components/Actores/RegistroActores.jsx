import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import actoresService from "../../services/actores.service";
import episodiosService from "../../services/episodios.service";

function RegistroActores() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [actores, setActores] = useState([]);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const fechaActual = new Date().toISOString().split("T")[0];

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

  useEffect(() => {
    const obtenerActores = async () => {
      try {
        const data = await actoresService.getActores();
        setActores(data);
      } catch (error) {
        console.error("Error al obtener los actores:", error);
        mostrarMensajeError("Error al obtener los actores.");
      }
    };
    obtenerActores();
  }, []);

  const onSubmit = async (data) => {
    try {
      await actoresService.postActores(data);
      const updatedActores = await actoresService.getActores();
      setActores(updatedActores);
      reset();
      mostrarMensajeExito("Actor registrado correctamente.");
    } catch (error) {
      console.error("Error al registrar el actor:", error);
      mostrarMensajeError("Error al registrar el actor. Inténtalo nuevamente.");
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
      <h3 className="text-center mb-4">Registrar un Actor</h3>
      {/* Formulario de registro */}
      <div className="d-flex justify-content-center">
        <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre del actor */}
            <div className="mb-3">
              <label htmlFor="nombre_actor" className="form-label">
                Nombre del actor:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre_actor"
                {...register("nombre_actor", {
                  required: "Este campo es requerido",
                  maxLength: {
                    value: 20,
                    message:
                      "El nombre del actor no puede tener más de 20 caracteres",
                  },
                })}
              />
              {errors.nombre_actor && (
                <span className="text-danger small">
                  {errors.nombre_actor.message}
                </span>
              )}
            </div>
            {/* Fecha de Nacimiento */}
            <div className="mb-3">
              <label htmlFor="fecha_nacimiento" className="form-label">
                Fecha de Nacimiento:
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha_nacimiento"
                {...register("fecha_nacimiento", {
                  required: "Este campo es requerido",
                })}
                max={fechaActual}
              />
              {errors.fecha_nacimiento && (
                <span className="text-danger small">
                  {errors.fecha_nacimiento.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="episodio_id" className="form-label">
                Episodio:
              </label>
              <select
                className={`form-control ${
                  errors.episodio_id ? "is-invalid" : ""
                }`}
                id="episodio_id"
                {...register("episodio_id", { required: true })}
              >
                <option value="">Seleccione un episodio</option>
                {episodios.map((episodio) => (
                  <option
                    key={episodio.episodio_id}
                    value={episodio.episodio_id}
                  >
                    {episodio.nombre_episodio}
                  </option>
                ))}
              </select>
              {errors.episodio_id && (
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              )}
            </div>
            {/* Botones */}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary mx-2">
                Registrar
              </button>
              <button
                type="reset"
                className="btn btn-primary"
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
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 999, maxWidth: "300px", width: "100%" }}
        >
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
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 999, maxWidth: "300px", width: "100%" }}
        >
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

export default RegistroActores;
