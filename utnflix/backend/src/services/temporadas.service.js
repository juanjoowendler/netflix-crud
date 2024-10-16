import Temporadas from "../models/temporadas.js";

// Crear una nueva temporada
export const crearTemporada = async (datosTemporada) => {
  try {
    const nuevaTemporada = await Temporadas.create(datosTemporada);
    return nuevaTemporada;
  } catch (error) {
    throw error;
  }
};

// Obtener un temporada por ID
export const obtenerTemporadaPorId = async (id) => {
  try {
    const temporada = await Temporadas.findByPk(id);
    return temporada; 
  } catch (error) {
    console.error(`Error en obtenerTemporadaPorId: ${error.message}`);
    throw new Error('Error al buscar el actor');
  }
};


// Obtener todas las temporadas
export const obtenerTodasLasTemporadas = async () => {
  try {
    const temporada = await Temporadas.findAll({include: "serie"});
    return temporada;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

// Actualizar una temporada
export const actualizarTemporada = async (id, datosActualizados) => {
  try {
    const temporada = await Temporadas.findByPk(id);
    if (!temporada) {
      throw new Error("Temporada no encontrado");
    }
    await temporada.update(datosActualizados);
    return temporada;
  } catch (error) {
    throw error;
  }
};

// Eliminar una temporada
export const eliminarTemporada = async (id) => {
  try {
    const temporada = await Temporadas.findByPk(id);
    if (!temporada) {
      throw new Error("Temporada no encontrada");
    }
    await temporada.destroy();
    return { mensaje: "Temporada eliminada exitosamente" };
  } catch (error) {
    throw error;
  }
};
