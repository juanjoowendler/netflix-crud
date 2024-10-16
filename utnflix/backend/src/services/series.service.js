import Series from "../models/series.js";
import { Op } from "sequelize";

// Crear una nueva serie
export const crearSerie = async (datosSerie) => {
  try {
    const nuevaSerie = await Series.create({
      nombre_serie: datosSerie.nombre_serie,
      fecha_estreno: datosSerie.fecha_estreno,
      genero_id: datosSerie.genero_id,
      descripcion: datosSerie.descripcion,
      imagenUrl: datosSerie.imagenUrl,
    });
    return nuevaSerie;
  } catch (error) {
    throw error;
  }
};

// Obtener una serie por ID
export const obtenerSeriePorId = async (id) => {
  try {
    const serie = await Series.findByPk(id);
    return serie; 
  } catch (error) {
    console.error(`Error en obtenerSeriePorId: ${error.message}`);
    throw new Error('Error al buscar la Serie');
  }
};

// Obtener todas las series con filtro por nombre
export const obtenerTodasLasSeries = async (filterText) => {
  try {
    const filterConditions = {};

    if (filterText) {
      filterConditions.nombre_serie = { [Op.like]: `%${filterText}%` };
    }

    // Consulta a la base de datos con las condiciones de filtro
    const series = await Series.findAll({
      where: filterConditions,
      order: [["nombre_serie", "ASC"]],
      include: "genero"
    });

    return series;
  } catch (error) {
    throw error;
  }
};

// Actualizar una serie por ID
export const actualizarSerie = async (id, datosActualizados) => {
  try {
    const serie = await Series.findByPk(id);
    if (!serie) {
      throw new Error("Serie no encontrada");
    }

    // Actualizamos todos los campos permitidos, incluyendo `descripcion` y `imagenUrl`
    await serie.update({
      nombre_serie: datosActualizados.nombre_serie,
      fecha_estreno: datosActualizados.fecha_estreno,
      genero_id: datosActualizados.genero_id,
      descripcion: datosActualizados.descripcion,
      imagenUrl: datosActualizados.imagenUrl,
    });

    return serie;
  } catch (error) {
    throw error;
  }
};

// Eliminar una serie por ID
export const eliminarSerie = async (id) => {
  try {
    const serie = await Series.findByPk(id);
    if (!serie) {
      throw new Error("Serie no encontrada");
    }

    await serie.destroy();
    return { mensaje: "Serie eliminada exitosamente" };
  } catch (error) {
    throw error;
  }
};
