import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EliminarSeries from "../Series/EliminarSeries";
import service from "../../services/series.service";
import generosService from "../../services/generos.service";
import { Alert } from "react-bootstrap";

const TablaSeries = ({ series, handleFiltrar }) => {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [serieSeleccionada, setSerieSeleccionada] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [seriesPerPage] = useState(4); // Cantidad de series por página
  const [generos, setGeneros] = useState([]);
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const [success, setSuccess] = useState(""); // Estado para el mensaje de éxito
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFiltrar(filtroNombre);
  };

  const handleChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  const handleEliminarSerie = async (serieId) => {
    try {
      await service.eliminarSerie(serieId);
      console.log("Serie eliminada correctamente");
      setSuccess("Serie eliminada correctamente."); // Establecer el mensaje de éxito
      handleFiltrar(filtroNombre); // Actualizar la lista de series después de eliminar
      handleCloseEliminar();
    } catch (error) {
      console.error("Error al eliminar la serie:", error);
      setError("No se puede eliminar la serie porque contiene temporadas."); // Establecer el mensaje de error
      handleCloseEliminar(); // Cerrar el modal en caso de error también
    }
  };

  const handleMostrarEliminar = (serieId) => {
    setSerieSeleccionada(serieId);
    setMostrarEliminar(true);
  };

  const handleCloseEliminar = () => {
    setMostrarEliminar(false);
    setSerieSeleccionada(null);
  };

  const handleModificarClick = (id) => {
    navigate(`/modificar-serie/${id}`);
  };

  const handleImageError = (event) => {
    event.target.style.backgroundColor = "lightgray"; // Cambiar el fondo a gris en caso de error de carga de la imagen
  };

  // Calcular índices de las series que se mostrarán en la página actual
  const indexOfLastSerie = currentPage * seriesPerPage;
  const indexOfFirstSerie = indexOfLastSerie - seriesPerPage;
  const currentSeries = series.slice(indexOfFirstSerie, indexOfLastSerie);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Funcion de generos
  const getNombreGenero = (generoId) => {
    const genero = generos.find((g) => g.genero_id === generoId);
    return genero ? genero.nombre_genero : "Desconocido";
  };

  return (
    <div>
      <div className="text-center mb-4">
        <form className="mb-3 d-inline-flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Introduce un nombre"
            value={filtroNombre}
            onChange={handleChange}
          />
          <button className="btn btn-danger" type="submit">
            Buscar
          </button>
        </form>
      </div>

      {error && ( // Mostrar el mensaje de error si existe
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {success && ( // Mostrar el mensaje de éxito si existe
        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
          {success}
        </Alert>
      )}

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {currentSeries &&
          currentSeries.map((serie) => (
            <div className="col " key={serie.serie_id}>
              <div className="card h-100">
                <div className="row g-0">
                  <div className="col-md-4 d-flex align-items-center">
                    <img
                      src={serie.imagenUrl}
                      alt={serie.nombre_serie}
                      className="card-img"
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        backgroundColor: "lightgray", // Color de fondo por defecto
                      }}
                      onError={handleImageError} // Manejar error de carga de la imagen
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title fw-bold">
                        {serie.nombre_serie}
                      </h5>
                      <p className="card-text">
                        <strong>Fecha Estreno:</strong> {serie.fecha_estreno}
                      </p>
                      <p className="card-text">
                        <strong>Género:</strong> {serie.genero.nombre_genero}
                      </p>
                      <p className="card-text">
                        <strong>Descripción:</strong> {serie.descripcion}
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleMostrarEliminar(serie.serie_id)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => handleModificarClick(serie.serie_id)}
                      >
                        Modificar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Paginación */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          {Array.from(
            { length: Math.ceil(series.length / seriesPerPage) },
            (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>

      <EliminarSeries
        serieId={serieSeleccionada}
        show={mostrarEliminar}
        handleClose={handleCloseEliminar}
        handleEliminar={handleEliminarSerie}
      />
    </div>
  );
};

export default TablaSeries;
