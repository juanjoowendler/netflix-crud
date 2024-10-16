import express from "express";
import {
  crearGeneros,
  obtenerGeneroPorId,
  obtenerTodosLosGeneros,
  actualizarGenero,
  eliminarGenero,
} from "../services/generos.service.js";

const router = express.Router();

// Ruta para crear un nuevo género
router.post("/", async (req, res) => {
  try {
    const nuevoGenero = await crearGeneros(req.body);
    res.status(201).json(nuevoGenero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener un género por ID
router.get("/:id", async (req, res) => {
  try {
    const genero = await obtenerGeneroPorId(req.params.id);
    if (genero) {
      res.status(200).json(genero);
    } else {
      res.status(404).json({ error: "Género no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los géneros
router.get("/", async (req, res) => {
  try {
    const filterText = req.query.filterText || ""; 
    const generos = await obtenerTodosLosGeneros(filterText); 
    res.status(200).json(generos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un género
router.put("/:id", async (req, res) => {
  try {
    const generoActualizado = await actualizarGenero(req.params.id, req.body);
    if (generoActualizado) {
      res.status(200).json(generoActualizado);
    } else {
      res.status(404).json({ error: "Género no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un género
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await eliminarGenero(req.params.id);
    if (resultado) {
      res.status(200).json({ mensaje: "Género eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Género no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
