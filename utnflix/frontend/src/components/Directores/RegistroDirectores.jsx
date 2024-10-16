import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import directoresService from "../../services/directores.service";
import episodiosService from "../../services/episodios.service";

const RegistrarDirector = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [mensajeExito, setMensajeExito] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);
  const [episodios, setEpisodios] = useState([]);

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

  const onSubmit = async (data) => {
    try {
      // Verificar que todos los campos estén completos
      if (!data.nombre_director || !data.nacionalidad || !data.episodio_id) {
        mostrarMensajeError("Por favor completa todos los campos.");
        return;
      }

      const response = await directoresService.postDirectores(data);
      console.log("Director creado:", response);
      reset();
      mostrarMensajeExito("Director registrado correctamente.");
    } catch (error) {
      console.error("Error al crear director:", error);
      mostrarMensajeError(
        "Error al registrar el director. Inténtalo nuevamente."
      );
    }
  };

  const mostrarMensajeExito = (texto) => {
    setMensajeExito(texto);
    setTimeout(() => {
      setMensajeExito(null);
    }, 2000); // Desaparece el mensaje de éxito después de 2 segundos (2000 milisegundos)
  };

  const mostrarMensajeError = (texto) => {
    setMensajeError(texto);
    setTimeout(() => {
      setMensajeError(null);
    }, 2000); // Desaparece el mensaje de error después de 2 segundos (2000 milisegundos)
  };

  const handleLimpiar = () => {
    reset(); // Utiliza la función reset de react-hook-form para limpiar los campos
  };

  return (
    <div className="m-5 d-flex flex-column justify-content-center align-items-center">
      <h3 className="text-center mb-4">Registrar un Director</h3>
      <div className="card p-5">
        {/* Mensaje de error */}
        {mensajeError && (
          <div
            className="position-fixed top-0 end-0 p-3"
            style={{ zIndex: 999 }}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="nombre_director" className="form-label">
              Nombre del Director:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.nombre_director ? "is-invalid" : ""
              }`}
              id="nombre_director"
              {...register("nombre_director", {
                required: true,
                maxLength: {
                  value: 20,
                },
              })}
            />
            {errors.nombre_director && (
              <div className="invalid-feedback">
                Este campo es obligatorio y debe poseer menos de 20 caracteres.
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="nacionalidad" className="form-label">
              Nacionalidad:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.nacionalidad ? "is-invalid" : ""
              }`}
              id="nacionalidad"
              {...register("nacionalidad", { required: true })}
            />
            {errors.nacionalidad && (
              <div className="invalid-feedback">Este campo es obligatorio.</div>
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
                <option key={episodio.episodio_id} value={episodio.episodio_id}>
                  {episodio.nombre_episodio}
                </option>
              ))}
            </select>
            {errors.episodio_id && (
              <div className="invalid-feedback">Este campo es obligatorio.</div>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
            <button
              type="button"
              className="btn btn-primary mx-2"
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
    </div>
  );
};

export default RegistrarDirector;
