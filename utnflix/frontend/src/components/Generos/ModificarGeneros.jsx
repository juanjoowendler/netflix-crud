import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import service from "../../services/generos.service";

const ModificarGenero = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
        const resGenero = await service.obtenerGeneroPorId(id);
        setValue("nombre_genero", resGenero.nombre_genero);
      } catch (error) {
        console.error("Error al cargar los datos del género", error);
      }
    };

    if (id) {
      cargarDatos();
    } else {
      console.error("ID de género no válido");
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await service.actualizarGenero(id, data);
      navigate("/lista-genero");
    } catch (error) {
      console.error("Error al actualizar el género", error);
    }
  };

  const handleReset = () => {
    reset({
      nombre_genero: "",
    });
  };

  return (
    <div className="container m-5">
      <h3 className="text-center mb-4">Modificar Género</h3>
      <div className="d-flex justify-content-center">
        <div className="card p-4" style={{ maxWidth: "600px", width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre del Género */}
            <div className="mb-3">
              <label htmlFor="nombre_genero" className="form-label">
                Nombre del Género:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre_genero"
                {...register("nombre_genero", {
                  required: "Este campo es requerido",
                })}
              />
              {errors.nombre_genero && (
                <span className="text-danger small">
                  {errors.nombre_genero.message}
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

export default ModificarGenero;
