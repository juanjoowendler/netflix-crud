// services/directores.service.js

import axios from "axios";

const URL = "http://localhost:3001/directores";

const getDirectores = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDirectoresFiltrados = async (filtro) => {
  try {
    const response = await axios.get(`${URL}?filterText=${filtro}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postDirectores = async (director) => {
  try {
    const response = await axios.post(URL, director);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const eliminarDirector = async (id) => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const obtenerDirectorPorId = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const actualizarDirector = async (id, director) => {
  try {
    const response = await axios.put(`${URL}/${id}`, director);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const directoresService = {
  getDirectores,
  getDirectoresFiltrados,
  postDirectores,
  eliminarDirector,
  obtenerDirectorPorId,
  actualizarDirector,
};

export default directoresService;
