import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbInit from "./data/db.js";

import actoresRouter from "./src/routes/actores.routes.js";
import directoresRouter from "./src/routes/directores.routes.js";
import episodiosRouter from "./src/routes/episodios.routes.js";
import generosRouter from "./src/routes/generos.routes.js";
import seriesRouter from "./src/routes/series.routes.js";
import temporadasRouter from "./src/routes/temporadas.routes.js";

import specificErrorHandler from "./middlewares/specificErrorHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";

dotenv.config({ path: "./config/.env" });

const app = express();

// Middlewares
app.use(cors());
app.use(logger);
app.use(express.json());
// Rutas
app.get("/status", (req, res) => {
  res.json({ respuesta: "API iniciada y escuchando..." });
});

app.use("/actores", actoresRouter);
app.use("/directores", directoresRouter);
app.use("/episodios", episodiosRouter);
app.use("/generos", generosRouter);
app.use("/series", seriesRouter);
app.use("/temporadas", temporadasRouter);

// Middlewares de manejo de errores
app.use(specificErrorHandler); // Middleware de manejo de errores específicos
app.use(errorHandler); // Middleware de manejo de errores general

// Inicializar la conexión a la base de datos y el servidor
(async function start() {
  const PORT = process.env.PORT || 3000;

  // Inicializar la conexión a la base de datos
  await dbInit;

  // Iniciar el servidor
  const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
  });
})();


export default app;
