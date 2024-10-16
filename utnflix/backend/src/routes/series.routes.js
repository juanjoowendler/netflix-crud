import express from "express";
import {
  crearSerie,
  obtenerSeriePorId,
  obtenerTodasLasSeries,
  actualizarSerie,
  eliminarSerie,
} from "../services/series.service.js";

const router = express.Router();

// Ruta para crear una nueva serie
router.post("/", async (req, res) => {
  try {
    const nuevaSerie = await crearSerie(req.body);
    res.status(201).json(nuevaSerie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener una serie por ID
router.get("/:id", async (req, res) => {
  try {
    const serie = await obtenerSeriePorId(req.params.id);
    if (serie) {
      res.status(200).json(serie);
    } else {
      res.status(404).json({ error: "Serie no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todas las series con filtro por nombre
router.get("/", async (req, res) => {
  try {
    const filterText = req.query.filterText || "";
    const series = await obtenerTodasLasSeries(filterText);
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar una serie por ID
router.put("/:id", async (req, res) => {
  try {
    const serieActualizada = await actualizarSerie(req.params.id, req.body);
    if (serieActualizada) {
      res.status(200).json(serieActualizada);
    } else {
      res.status(404).json({ error: "Serie no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar una serie por ID
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await eliminarSerie(req.params.id);
    if (resultado) {
      res.status(200).json({ mensaje: "Serie eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Serie no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
