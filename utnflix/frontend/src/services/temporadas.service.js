// temporadas.service.js

import axios from "axios";

const URL = "http://localhost:3001/temporadas";

const getTemporadas = async () => {
  const response = await axios.get(URL);
  return response.data;
};

const getTemporadasFiltradas = async (filtro) => {
  const params = new URLSearchParams();

  if (filtro) {
    params.append("filterText", filtro);
  }

  const response = await axios.get(`${URL}`, { params });
  return response.data;
};

const postTemporada = async (temporada) => {
  const response = await axios.post(URL, temporada);
  return response.data;
};

const eliminarTemporada = async (temporada) => {
  const response = await axios.delete(`${URL}/${temporada}`);
  return response.data;
};

const obtenerTemporadaPorId = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};

const actualizarTemporada = async (id, data) => {
  const response = await axios.put(`${URL}/${id}`, data);
  return response.data;
};

const temporadasService = {
  getTemporadas,
  getTemporadasFiltradas,
  postTemporada,
  eliminarTemporada,
  obtenerTemporadaPorId,
  actualizarTemporada,
};

export default temporadasService;
