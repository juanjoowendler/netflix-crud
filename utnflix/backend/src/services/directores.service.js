import Directores from "../models/directores.js";
import { Op } from "sequelize";

// Crear un nuevo director
export const crearDirector = async (datosDirector) => {
  try {
    const nuevoDirector = await Directores.create(datosDirector);
    return nuevoDirector;
  } catch (error) {
    throw error;
  }
};

// Obtener un director por ID
export const obtenerDirectorPorId = async (id) => {
  try {
    const director = await Directores.findByPk(id);
    return director; // Devuelve el director encontrado, o null si no se encuentra
  } catch (error) {
    // Aquí solo lanzamos el error si es una excepción inesperada
    console.error(`Error en obtenerDirectorPorId: ${error.message}`);
    throw new Error('Error al buscar el director');
  }
};

// Obtener todos los directores con filtro por nombre
export const obtenerTodosLosDirectores = async (filterText = "") => {
  try {
    const filterConditions = {};

    if (filterText) {
      filterConditions.nombre_director = { [Op.like]: `%${filterText}%` }; 
    }

    const directores = await Directores.findAll({
      where: filterConditions,
      order: [["nombre_director", "ASC"]], 
      include: "episodio_1"
    });

    return directores;
  } catch (error) {
    throw error;
  }
};

// Actualizar un director
export const actualizarDirector = async (id, datosActualizados) => {
  try {
    const director = await Directores.findByPk(id);
    if (!director) {
      throw new Error("Director no encontrado");
    }
    await director.update(datosActualizados);
    return director;
  } catch (error) {
    throw error;
  }
};

// Eliminar un director
export const eliminarDirector = async (id) => {
  try {
    const director = await Directores.findByPk(id);
    if (!director) {
      throw new Error("Director no encontrado");
    }
    await director.destroy();
    return { mensaje: "Director eliminado exitosamente" };
  } catch (error) {
    throw error;
  }
};
