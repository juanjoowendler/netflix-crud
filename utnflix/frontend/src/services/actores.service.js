import axios from "axios";

const URL = "http://localhost:3001/actores";

const getActores = async () => {
  const response = await axios.get(URL);
  return response.data;
};

const getActoresFiltrados = async (filtro) => {
  const params = new URLSearchParams();

  if (filtro) {
    params.append("filterText", filtro);
  }

  const response = await axios.get(`${URL}`, { params });
  return response.data;
};

const postActores = async (actor) => {
  const response = await axios.post(URL, actor);
  return response.data;
};

const eliminarActor = async (actorId) => {
  const response = await axios.delete(`${URL}/${actorId}`);
  return response.data;
};

const obtenerActoresPorId = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};

const actualizarActor = async (id, actor) => {
  const response = await axios.put(`${URL}/${id}`, actor);
  return response.data;
};

const actoresService = {
  getActores,
  getActoresFiltrados,
  postActores,
  eliminarActor,
  obtenerActoresPorId,
  actualizarActor,
};

export default actoresService;
