import Generos from "../models/generos.js";
import { Op } from "sequelize";

// Crear un nuevo género
export const crearGeneros = async (datosGenero) => {
  try {
    const nuevoGenero = await Generos.create(datosGenero);
    return nuevoGenero;
  } catch (error) {
    throw error;
  }
};

// Obtener un género por ID
export const obtenerGeneroPorId = async (id) => {
  try {
    const genero = await Generos.findByPk(id);
    return genero; 
  } catch (error) {
    console.error(`Error en obtenerGeneroPorId: ${error.message}`);
    throw new Error('Error al buscar el genero');
  }
};

// Obtener todos los géneros con filtro por nombre
export const obtenerTodosLosGeneros = async (filterText = "") => {
  try {
    const filterConditions = {};

    if (filterText) {
      filterConditions.nombre_genero = { [Op.like]: `%${filterText}%` }; 
    }

    const generos = await Generos.findAll({
      where: filterConditions,
      order: [["nombre_genero", "ASC"]], 
    });

    return generos;
  } catch (error) {
    throw error;
  }
};

// Actualizar un género
export const actualizarGenero = async (id, datosActualizados) => {
  try {
    const genero = await Generos.findByPk(id);
    if (!genero) {
      throw new Error("Genero no encontrado");
    }
    await genero.update(datosActualizados);
    return genero;
  } catch (error) {
    throw error;
  }
};

// Eliminar un género
export const eliminarGenero = async (id) => {
  try {
    const genero = await Generos.findByPk(id);
    if (!genero) {
      throw new Error("Genero no encontrado");
    }
    await genero.destroy();
    return { mensaje: "Genero eliminado exitosamente" };
  } catch (error) {
    throw error;
  }
};
