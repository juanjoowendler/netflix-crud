import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import temporadasService from "../../services/temporadas.service";

function ModificarTemporadas() {
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
        const resTemporada = await temporadasService.obtenerTemporadaPorId(id);
        setValue("numero_temporada", resTemporada.numero_temporada);
        setValue("fecha_lanzamiento", resTemporada.fecha_lanzamiento);
      } catch (error) {
        console.error("Error al cargar los datos de la temporada", error);
      }
    };

    if (id) {
      cargarDatos();
    } else {
      console.error("ID de temporada no válido");
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await temporadasService.actualizarTemporada(id, data);
      navigate("/lista-temporada");
    } catch (error) {
      console.error("Error al actualizar la temporada", error);
    }
  };

  return (
    <div className="container m-5">
      <h3 className="text-center mb-4">Modificar una Temporada</h3>
      <div className="d-flex justify-content-center">
        <div className="card p-4" style={{ maxWidth: "600px", width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="numero_temporada" className="form-label">
                Número de Temporada:
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
            <div className="mb-3">
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
              />
              {errors.fecha_lanzamiento && (
                <span className="text-danger small">
                  {errors.fecha_lanzamiento.message}
                </span>
              )}
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary mx-1">
                Modificar
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
    </div>
  );
}

export default ModificarTemporadas;
