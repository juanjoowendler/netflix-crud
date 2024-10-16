const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salio mal" });
};

export default errorHandler;


