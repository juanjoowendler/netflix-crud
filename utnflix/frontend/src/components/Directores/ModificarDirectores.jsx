import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import directoresService from "../../services/directores.service";
import episodiosService from "../../services/episodios.service";

const ModificarDirector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episodios, setEpisodios] = useState([]); 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resDirector = await directoresService.obtenerDirectorPorId(id);
        if (resDirector) {
          setValue("nombre_director", resDirector.nombre_director || "");
          setValue("nacionalidad", resDirector.nacionalidad || "");
          setValue("episodio_id", resDirector.episodio_id || ""); 
        } else {
          console.error("Director no encontrado");
        }
      } catch (error) {
        console.error("Error al cargar los datos del director", error);
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
      console.error("ID de director no válido");
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await directoresService.actualizarDirector(id, data);
      navigate("/lista-director");
    } catch (error) {
      console.error("Error al actualizar el director", error);
    }
  };

  const handleReset = () => {
    reset({
      nombre_director: "",
      nacionalidad: "",
      episodio_id: "",
    });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Modificar Director</h3>
      <div className="d-flex justify-content-center">
        <div className="card p-4" style={{ maxWidth: "600px", width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre del Director */}
            <div className="mb-3">
              <label htmlFor="nombre_director" className="form-label">
                Nombre del Director:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre_director"
                {...register("nombre_director", {
                  required: "Este campo es requerido",
                })}
              />
              {errors.nombre_director && (
                <span className="text-danger small">
                  {errors.nombre_director.message}
                </span>
              )}
            </div>
            {/* Nacionalidad */}
            <div className="mb-3">
              <label htmlFor="nacionalidad" className="form-label">
                Nacionalidad:
              </label>
              <input
                type="text"
                className="form-control"
                id="nacionalidad"
                {...register("nacionalidad", {
                  required: "Este campo es requerido",
                })}
              />
              {errors.nacionalidad && (
                <span className="text-danger small">
                  {errors.nacionalidad.message}
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
                type="button"
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
  );
};

export default ModificarDirector;
