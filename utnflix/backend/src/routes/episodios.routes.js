import express from "express";
import {
  crearEpisodio,
  obtenerEpisodioPorId,
  obtenerTodosLosEpisodios,
  actualizarEpisodio,
  eliminarEpisodio,
} from "../services/episodios.service.js";

const router = express.Router();

// Ruta para crear un nuevo episodio
router.post("/", async (req, res) => {
  try {
    const nuevoEpisodio = await crearEpisodio(req.body);
    res.status(201).json(nuevoEpisodio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener un episodio por ID
router.get("/:id", async (req, res) => {
  try {
    const episodio = await obtenerEpisodioPorId(req.params.id);
    if (episodio) {
      res.status(200).json(episodio);
    } else {
      res.status(404).json({ error: "Episodio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los episodios
router.get("/", async (req, res) => {
  try {
    const episodios = await obtenerTodosLosEpisodios();
    res.status(200).json(episodios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un episodio
router.put("/:id", async (req, res) => {
  try {
    const episodioActualizado = await actualizarEpisodio(
      req.params.id,
      req.body
    );
    if (episodioActualizado) {
      res.status(200).json(episodioActualizado);
    } else {
      res.status(404).json({ error: "Episodio no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un episodio
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await eliminarEpisodio(req.params.id);
    if (resultado) {
      res.status(200).json({ mensaje: "Episodio eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Episodio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
