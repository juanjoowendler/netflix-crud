import express from "express";
import {
  crearTemporada,
  obtenerTemporadaPorId,
  obtenerTodasLasTemporadas,
  actualizarTemporada,
  eliminarTemporada,
} from "../services/temporadas.service.js";
const router = express.Router();

// Ruta para crear una nueva temporada
router.post("/", async (req, res) => {
  try {
    const nuevaTemporada = await crearTemporada(req.body);
    res.status(201).json(nuevaTemporada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener una temporada por ID
router.get("/:id", async (req, res) => {
  try {
    const temporada = await obtenerTemporadaPorId(req.params.id);
    if (temporada) {
      res.status(200).json(temporada);
    } else {
      res.status(404).json({ error: "Temporada no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todas las temporadas
router.get("/", async (req, res) => {
  try {
    const temporadas = await obtenerTodasLasTemporadas();
    res.status(200).json(temporadas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar una temporada
router.put("/:id", async (req, res) => {
  try {
    const temporadaActualizada = await actualizarTemporada(
      req.params.id,
      req.body
    );
    if (temporadaActualizada) {
      res.status(200).json(temporadaActualizada);
    } else {
      res.status(404).json({ error: "Temporada no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar una temporada
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await eliminarTemporada(req.params.id);
    if (resultado) {
      res.status(200).json({ mensaje: "Temporada eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Temporada no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
