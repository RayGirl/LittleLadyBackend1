class ErrorResponse extends Error {
    constructor(status_code, message) {
        super(message);
        this.status_code = status_code;
    }
}

module.exports = ErrorResponse;