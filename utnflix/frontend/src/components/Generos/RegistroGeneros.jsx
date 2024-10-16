import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import service from "../../services/generos.service.js";

const RegistroGeneros = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [generos, setGeneros] = useState([]);
  const [mensajeExito, setMensajeExito] = useState(null); // Estado para mensaje de éxito
  const [mensajeError, setMensajeError] = useState(null); // Estado para mensaje de error

  useEffect(() => {
    const obtenerGeneros = async () => {
      try {
        const data = await service.getGeneros();
        setGeneros(data);
      } catch (error) {
        console.error("Error al obtener los géneros:", error);
        mostrarMensajeError("Error al obtener los géneros.");
      }
    };
    obtenerGeneros();
  }, []);

  const onSubmit = async (data) => {
    try {
      await service.postGenero(data);
      const updatedGeneros = await service.getGeneros();
      setGeneros(updatedGeneros);
      reset();
      mostrarMensajeExito("Género registrado correctamente.");
    } catch (error) {
      console.error("Error al registrar el género:", error);
      mostrarMensajeError(
        "Error al registrar el género. Inténtalo nuevamente."
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
    <div className="container m-5">
      <h3 className="text-center mb-4">Registrar un Género</h3>
      <div className="d-flex justify-content-center">
        <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="nombre_genero" className="form-label">
                Nombre del Género:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre_genero"
                {...register("nombre_genero", {
                  required: "Este campo es requerido ",
                  maxLength: {
                    value: 20,
                    message:
                      "El nombre del genero no puede tener más de 20 caracteres",
                  },
                })}
              />
              {errors.nombre_genero && (
                <span className="text-danger small">
                  {errors.nombre_genero.message}
                </span>
              )}
            </div>
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

export default RegistroGeneros;
