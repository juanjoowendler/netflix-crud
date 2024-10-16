import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import service from "../../services/series.service";
import generosService from "../../services/generos.service";

const ModificarSerie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resSerie = await service.obtenerSeriePorId(id);
        setValue("nombre_serie", resSerie.nombre_serie);
        setValue("genero_id", resSerie.genero_id);
        setValue("fecha_estreno", resSerie.fecha_estreno);
        setValue("descripcion", resSerie.descripcion);
        setValue("imagenUrl", resSerie.imagenUrl);
      } catch (error) {
        console.error("Error al cargar los datos de la serie", error);
      }
    };

    const cargarGeneros = async () => {
      try {
        const listaGeneros = await generosService.getGeneros(); // Reemplaza con tu método para obtener los géneros
        setGeneros(listaGeneros);
      } catch (error) {
        console.error("Error al cargar los géneros", error);
      }
    };

    if (id) {
      cargarDatos();
    } else {
      console.error("ID de serie no válido");
    }

    cargarGeneros();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await service.actualizarSerie(id, data);
      navigate("/lista-series");
    } catch (error) {
      console.error("Error al actualizar la serie", error);
    }
  };

  return (
    <div className="container m-5">
      <h3 className="text-center mb-4">Modificar Serie</h3>
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
                className="form-select"
                id="genero_id"
                {...register("genero_id", {
                  required: "Este campo es requerido",
                })}
              >
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
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={() => navigate("/lista-series")}
              >
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModificarSerie;
