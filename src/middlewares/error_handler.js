const errorHandler = (err, req, res, next) => {
    const status_code = err.status_code || 500; // Default to 500 if no status code
    const message = err.message || "Internal Server Error";

    res.status(status_code).json({
        success: false,
        status_code,
        message,
        // Show stack trace in development only
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

module.exports = errorHandler;
