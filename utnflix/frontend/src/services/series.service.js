import axios from "axios";

const URL = "http://localhost:3001/series";

const getSeries = async () => {
  const response = await axios.get(URL);
  return response.data;
};

const getSeriesFiltrados = async (filtro) => {
  const params = new URLSearchParams();

  if (filtro) {
    params.append("filterText", filtro);
  }

  const response = await axios.get(`${URL}`, { params });
  return response.data;
};

const postSeries = async (serie) => {
  const response = await axios.post(URL, serie);
  return response.data;
};

const eliminarSerie = async (serieId) => {
  const response = await axios.delete(`${URL}/${serieId}`);
  return response.data;
};

const obtenerSeriePorId = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};

const actualizarSerie = async (id, serie) => {
  const response = await axios.put(`${URL}/${id}`, serie);
  return response.data;
};

const seriesService = {
  getSeries,
  getSeriesFiltrados,
  postSeries,
  eliminarSerie,
  obtenerSeriePorId,
  actualizarSerie,
};

export default seriesService;
