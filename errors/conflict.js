class ConflictError extends Error {
  constructor(message) {
    message = message || 'Конфликт запроса с текущим состоянием сервера';
    super(message);

    this.statusCode = 409;
  }
}

module.exports = ConflictError;
