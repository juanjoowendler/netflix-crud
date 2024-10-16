import { Link } from "react-router-dom";
import logo from "../../assets/imgs/UTNFLIX.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="UTNFLIX" width="100" height="30" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ "--bs-scroll-height": "100px" }}
          >
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="seriesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Series
              </a>
              <ul className="dropdown-menu" aria-labelledby="seriesDropdown">
                <li>
                  <Link className="dropdown-item" to="/lista-series">
                    Listado
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/nueva-serie">
                    Registrar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="genresDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Géneros
              </a>
              <ul className="dropdown-menu" aria-labelledby="genresDropdown">
                <li>
                  <Link className="dropdown-item" to="/lista-genero">
                    Listado
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/nuevo-genero">
                    Registrar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="seasonsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Temporadas
              </a>
              <ul className="dropdown-menu" aria-labelledby="seasonsDropdown">
                <li>
                  <Link className="dropdown-item" to="/lista-temporada">
                    Listado
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/nueva-temporada">
                    Registrar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="episodesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Episodios
              </a>
              <ul className="dropdown-menu" aria-labelledby="episodesDropdown">
                <li>
                  <Link className="dropdown-item" to="/lista-episodios">
                    Listado
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/nuevo-episodio">
                    Registrar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="directorsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Directores
              </a>
              <ul className="dropdown-menu" aria-labelledby="directorsDropdown">
                <li>
                  <Link className="dropdown-item" to="/lista-director">
                    Listado
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/nuevo-director">
                    Registrar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="actorsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Actores
              </a>
              <ul className="dropdown-menu" aria-labelledby="actorsDropdown">
                <li>
                  <Link className="dropdown-item" to="/lista-actores">
                    Listado
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/registrar-actor">
                    Registrar
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
