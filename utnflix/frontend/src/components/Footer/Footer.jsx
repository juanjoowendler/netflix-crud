import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/UTNFLIX.png";

const Footer = () => {
  return (
    <footer className="p-5 bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-center flex-column align-items-center">
        <div className="row">
          <div className="col-md-6">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="UTNFLIX" width="120" height="40" />
            </Link>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="text-secondary">
            &copy; 2024 UTNFLIX. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
