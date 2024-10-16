// episodios.service.js

import axios from "axios";

const URL = "http://localhost:3001/episodios";

const getEpisodios = async () => {
  const response = await axios.get(URL);
  return response.data;
};

const getEpisodiosFiltrados = async (filtro) => {
  const params = new URLSearchParams();

  if (filtro) {
    params.append("filterText", filtro);
  }

  const response = await axios.get(`${URL}`, { params });
  return response.data;
};

const postEpisodio = async (episodio) => {
  const response = await axios.post(URL, episodio);
  return response.data;
};

const eliminarEpisodio = async (episodioId) => {
  const response = await axios.delete(`${URL}/${episodioId}`);
  return response.data;
};

const obtenerEpisodioPorId = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};

const actualizarEpisodio = async (id, data) => {
  const response = await axios.put(`${URL}/${id}`, data);
  return response.data;
};

const episodiosService = {
  getEpisodios,
  getEpisodiosFiltrados,
  postEpisodio,
  eliminarEpisodio,
  obtenerEpisodioPorId,
  actualizarEpisodio,
};

export default episodiosService;
