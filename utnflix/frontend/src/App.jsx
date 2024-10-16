import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
// Series
import RegistroSeries from "./components/Series/RegistroSeries";
import ConsultaSeries from "./components/Series/ConsultaSeries";
import ModificarSerie from "./components/Series/ModificarSeries";
// Temporadas
import RegistroTemporadas from "./components/Temporadas/RegistroTemporadas";
import ConsultaTemporadas from "./components/Temporadas/ConsultaTemporadas";
import ModificarTemporadas from "./components/Temporadas/ModificarTemporadas";
// Generos
import RegistroGeneros from "./components/Generos/RegistroGeneros";
import ConsultaGeneros from "./components/Generos/ConsultaGeneros";
import ModificarGeneros from "./components/Generos/ModificarGeneros";
// Directores
import RegistroDirectores from "./components/Directores/RegistroDirectores";
import ConsultaDirectores from "./components/Directores/ConsultaDirectores";
import ModificarDirectores from "./components/Directores/ModificarDirectores";
// Actores
import ConsultaActores from "./components/Actores/ConsultaActores";
import RegistroActores from "./components/Actores/RegistroActores";
import ModificarActores from "./components/Actores/ModificarActores";
// Episodios FALTA TERMINAR
import ConsultaEpisodios from "./components/Episodios/ConsultaEpisodios";
import RegistroEpisodios from "./components/Episodios/RegistroEpisodios";
import ModificarEpisodios from "./components/Episodios/ModificarEpisodios";

// Home
import Home from "./components/Home/Home";
// Footer
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          {/* Series */}
          <Route path="/nueva-serie" element={<RegistroSeries />} />
          <Route path="/lista-series" element={<ConsultaSeries />} />
          <Route path="/modificar-serie/:id" element={<ModificarSerie />} />
          {/* Temporadas */}
          <Route path="/nueva-temporada" element={<RegistroTemporadas />} />
          <Route path="/lista-temporada" element={<ConsultaTemporadas />} />
          <Route
            path="/modificar-temporada/:id"
            element={<ModificarTemporadas />}
          />
          {/* Generos */}
          <Route path="/nuevo-genero" element={<RegistroGeneros />} />
          <Route path="/lista-genero" element={<ConsultaGeneros />} />
          <Route path="/modificar-genero/:id" element={<ModificarGeneros />} />
          {/* Directores */}
          <Route path="/nuevo-director" element={<RegistroDirectores />} />
          <Route path="/lista-director" element={<ConsultaDirectores />} />
          <Route
            path="/modificar-director/:id"
            element={<ModificarDirectores />}
          />
          {/* Actores */}
          <Route path="/lista-actores" element={<ConsultaActores />} />
          <Route path="/registrar-actor" element={<RegistroActores />} />
          <Route path="/modificar-actor/:id" element={<ModificarActores />} />
          {/* Episodios */}
          <Route path="/lista-episodios" element={<ConsultaEpisodios />} />
          {<Route path="/nuevo-episodio" element={<RegistroEpisodios />} />}
          {
            <Route
              path="/modificar-episodio/:id"
              element={<ModificarEpisodios />}
            />
          }
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
