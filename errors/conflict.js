class ConflictError extends Error {
  constructor(message) {
    super(message || 'Конфликт запроса с текущим состоянием сервера');

    this.statusCode = 409;
  }
}

module.exports = ConflictError;
