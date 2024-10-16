import Episodios from "../models/episodios.js";

// Crear un nuevo episodio
export const crearEpisodio = async (datosEpisodio) => {
  try {
    const nuevoEpisodio = await Episodios.create(datosEpisodio);
    return nuevoEpisodio;
  } catch (error) {
    throw error;
  }
};

// Obtener un episodio por ID
export const obtenerEpisodioPorId = async (id) => {
  try {
    const episodio = await Episodios.findByPk(id);
    return episodio;
  } catch (error) {
    console.error(`Error en obtenerEpisodioPorId: ${error.message}`);
    throw new Error("Error al buscar el episodio");
  }
};

// Obtener todos los episodios
export const obtenerTodosLosEpisodios = async () => {
  try {
    const episodios = await Episodios.findAll({
      include: ["serie_1", "temporada"],
    });
    return episodios;
  } catch (error) {
    throw error;
  }
};

// Actualizar un episodio
export const actualizarEpisodio = async (id, datosActualizados) => {
  try {
    const episodio = await Episodios.findByPk(id);
    if (!episodio) {
      throw new Error("Episodio no encontrado");
    }
    await episodio.update(datosActualizados);
    return episodio;
  } catch (error) {
    throw error;
  }
};

// Eliminar un episodio
export const eliminarEpisodio = async (id) => {
  try {
    const episodio = await Episodios.findByPk(id);
    if (!episodio) {
      throw new Error("Episodio no encontrado");
    }
    await episodio.destroy();
    return { mensaje: "Episodio eliminado exitosamente" };
  } catch (error) {
    throw error;
  }
};
