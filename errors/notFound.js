class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Запрашиваемый ресурс не найден');

    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
