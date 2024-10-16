import express from "express";
import {
  crearActor,
  obtenerActorPorId,
  obtenerTodosLosActores,
  actualizarActor,
  eliminarActor,
} from "../services/actores.service.js";

const router = express.Router();

// Ruta para crear un nuevo actor
router.post("/", async (req, res) => {
  try {
    const nuevoActor = await crearActor(req.body);
    res.status(201).json(nuevoActor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener un actor por ID
router.get("/:id", async (req, res) => {
  try {
    const actor = await obtenerActorPorId(req.params.id);
    if (actor) {
      res.status(200).json(actor);
    } else {
      res.status(404).json({ error: "Actor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los actores con filtro opcional
router.get("/", async (req, res) => {
  try {
    const { filterText } = req.query;
    const actores = await obtenerTodosLosActores(filterText);
    res.status(200).json(actores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Ruta para actualizar un actor
router.put("/:id", async (req, res) => {
  try {
    const actorActualizado = await actualizarActor(req.params.id, req.body);
    if (actorActualizado) {
      res.status(200).json(actorActualizado);
    } else {
      res.status(404).json({ error: "Actor no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un actor
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await eliminarActor(req.params.id);
    if (resultado) {
      res.status(200).json({ mensaje: "Actor eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Actor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
