import Actores from "../models/actores.js";
import { Op } from "sequelize";

// Crear un nuevo actor
export const crearActor = async (datosActor) => {
  try {
    const nuevoActor = await Actores.create(datosActor);
    return nuevoActor;
  } catch (error) {
    throw error;
  }
};

// Obtener un actor por ID
export const obtenerActorPorId = async (id) => {
  try {
    const actor = await Actores.findByPk(id);
    return actor;
  } catch (error) {
    console.error(`Error en obtenerActorPorId: ${error.message}`);
    throw new Error("Error al buscar el actor");
  }
};

// Obtener todos los actores con filtro
export const obtenerTodosLosActores = async (filterText) => {
  try {
    let whereClause = {};
    if (filterText) {
      whereClause = {
        nombre_actor: {
          [Op.like]: `%${filterText}%`,
        },
      };
    }

    const actores = await Actores.findAll({
      where: whereClause,
      include: "episodio",
    });
    return actores;
  } catch (error) {
    throw error;
  }
};

// Actualizar un actor
export const actualizarActor = async (id, datosActualizados) => {
  try {
    const actor = await Actores.findByPk(id);
    if (!actor) {
      throw new Error("Actor no encontrado");
    }
    await actor.update(datosActualizados);
    return actor;
  } catch (error) {
    throw error;
  }
};

// Eliminar un actor
export const eliminarActor = async (id) => {
  try {
    const actor = await Actores.findByPk(id);
    if (!actor) {
      throw new Error("Actor no encontrado");
    }
    await actor.destroy();
    return { mensaje: "Actor eliminado exitosamente" };
  } catch (error) {
    throw error;
  }
};
