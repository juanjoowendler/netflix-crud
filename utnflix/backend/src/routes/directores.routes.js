import express from "express";
import {
  crearDirector,
  obtenerDirectorPorId,
  obtenerTodosLosDirectores,
  actualizarDirector,
  eliminarDirector,
} from "../services/directores.service.js";

const router = express.Router();

// Ruta para crear un nuevo director
router.post("/", async (req, res) => {
  try {
    const nuevoDirector = await crearDirector(req.body);
    res.status(201).json(nuevoDirector);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener un director por ID
router.get("/:id", async (req, res) => {
  try {
    const director = await obtenerDirectorPorId(req.params.id);
    if (director) {
      res.status(200).json(director);
    } else {
      res.status(404).json({ error: "Director no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los directores (con y sin filtro)
router.get("/", async (req, res) => {
  try {
    const filterText = req.query.filterText || ""; 
    const directores = await obtenerTodosLosDirectores(filterText); 
    res.status(200).json(directores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un director
router.put("/:id", async (req, res) => {
  try {
    const directorActualizado = await actualizarDirector(
      req.params.id,
      req.body
    );
    if (directorActualizado) {
      res.status(200).json(directorActualizado);
    } else {
      res.status(404).json({ error: "Director no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un director
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await eliminarDirector(req.params.id);
    if (resultado) {
      res.status(200).json({ mensaje: "Director eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Director no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
