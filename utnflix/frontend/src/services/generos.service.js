import axios from "axios";

const URL = "http://localhost:3001/generos"; 

const getGeneros = async () => {
  const response = await axios.get(URL);
  return response.data;
};

const getGenerosFiltrados = async (filtroNombre) => {
  const params = new URLSearchParams();

  if (filtroNombre) {
    params.append("filterText", filtroNombre);
  }

  const response = await axios.get(`${URL}`, { params });
  return response.data;
};

const postGenero = async (genero) => {
  const response = await axios.post(URL, genero);
  return response.data;
};

const eliminarGenero = async (generoId) => {
  const response = await axios.delete(`${URL}/${generoId}`);
  return response.data;
};

const obtenerGeneroPorId = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};

const actualizarGenero = async (id, genero) => {
  const response = await axios.put(`${URL}/${id}`, genero);
  return response.data;
};

const generosService = {
  getGeneros,
  getGenerosFiltrados,
  postGenero,
  eliminarGenero,
  obtenerGeneroPorId,
  actualizarGenero,
};

export default generosService;
