const specificErrorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    next(err);
};

export default specificErrorHandler;
