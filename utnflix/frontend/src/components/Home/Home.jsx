import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        <h1>
          Bienvenido a <span className="text-danger fw-bold">UTNFLIX</span>
        </h1>
        <p>
          Explora nuestra parodia de Netflix con contenido único y exclusivo.
        </p>
        <hr className="my-4" />
        <p>
          Gestiona el contenido de nuestros directores, actores, series,
          temporadas, episodios y géneros. Ahora con una{" "}
          <span className="text-decoration-underline">interfaz amigable</span>.
        </p>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Directores | <span className="text-primary">CRUD</span>
              </h5>
              <p className="card-text">
                Gestiona la información de los directores que han trabajado en
                nuestras series.
              </p>
              <div className="text-end">
                <Link className="dropdown-item" to="/lista-director">
                  <button className="btn btn-danger">
                    Ver más <i className="bi bi-plus-lg"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Géneros | <span className="text-primary">CRUD</span>{" "}
              </h5>
              <p className="card-text">
                Explora y administra los géneros de nuestras series.
              </p>
              <div className="text-end">
                <Link className="dropdown-item" to="/lista-genero">
                  <button className="btn btn-danger">
                    Ver más <i className="bi bi-plus-lg"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Actores | <span className="text-primary">CRUD</span>
              </h5>
              <p className="card-text">
                Administra la información de los actores que participan en
                nuestras series.
              </p>
              <div className="text-end">
                <Link className="dropdown-item" to="/lista-actores">
                  <button className="btn btn-danger">
                    Ver más <i className="bi bi-plus-lg"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Series | <span className="text-primary">CRUD</span>
              </h5>
              <p className="card-text">
                Explora y administra nuestras series disponibles en UTNFLIX.
              </p>
              <div className="text-end">
                <Link className="dropdown-item" to="/lista-series">
                  <button className="btn btn-danger">
                    Ver más <i className="bi bi-plus-lg"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Temporadas | <span className="text-primary">CRUD</span>
              </h5>
              <p className="card-text">
                Consulta la información de las temporadas de todas nuestras
                series.
              </p>
              <div className="text-end">
                <Link className="dropdown-item" to="/lista-temporada">
                  <button className="btn btn-danger">
                    Ver más <i className="bi bi-plus-lg"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Episodios | <span className="text-primary">CRUD</span>
              </h5>
              <p className="card-text">
                Administra los episodios de las temporadas de nuestras series.
              </p>
              <div className="text-end">
                <Link className="dropdown-item" to="/lista-episodios">
                  <button className="btn btn-danger">
                    Ver más <i className="bi bi-plus-lg"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
