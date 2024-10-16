import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import actoresService from "../../services/actores.service";
import episodiosService from "../../services/episodios.service";

function ModificarActores() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episodios, setEpisodios] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resActor = await actoresService.obtenerActoresPorId(id);
        setValue("nombre_actor", resActor.nombre_actor);
        setValue("fecha_nacimiento", resActor.fecha_nacimiento);
        setValue("episodio_id", resActor.episodio_id || ""); 
      } catch (error) {
        console.error("Error al cargar los datos del actor", error);
      }
    };

    const fetchEpisodios = async () => {
      try {
        const episodiosData = await episodiosService.getEpisodios();
        setEpisodios(episodiosData);
      } catch (error) {
        console.error("Error al obtener episodios:", error);
      }
    };

    if (id) {
      cargarDatos();
      fetchEpisodios();
    } else {
      console.error("ID de actor no válido");
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await actoresService.actualizarActor(id, data);
      navigate("/lista-actores");
    } catch (error) {
      console.error("Error al actualizar el actor", error);
    }
  };

  return (
    <div className="container m-5">
      <h3 className="text-center mb-4">Modificar un Actor</h3>
      {/* Formulario de registro */}
      <div className="d-flex justify-content-center">
        <div className="card p-4" style={{ maxWidth: "600px", width: "100%" }}>
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
              />
              {errors.fecha_nacimiento && (
                <span className="text-danger small">
                  {errors.fecha_nacimiento.message}
                </span>
              )}
            </div>
            {/* Episodio */}
            <div className="mb-3">
              <label htmlFor="episodio_id" className="form-label">
                Episodio:
              </label>
              <select
                className={`form-control ${errors.episodio_id ? "is-invalid" : ""}`}
                id="episodio_id"
                {...register("episodio_id", { required: "Este campo es requerido" })}
              >
                <option value="">Seleccione un episodio</option>
                {episodios.map((episodio) => (
                  <option key={episodio.episodio_id} value={episodio.episodio_id}>
                    {episodio.nombre_episodio}
                  </option>
                ))}
              </select>
              {errors.episodio_id && (
                <span className="text-danger small">
                  {errors.episodio_id.message}
                </span>
              )}
            </div>
            {/* Botones */}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary mx-1">
                Modificar
              </button>
              <button
                type="reset"
                className="btn btn-primary mx-1"
                onClick={() => setValue("episodio_id", "")}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModificarActores;
