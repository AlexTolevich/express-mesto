class NotFoundError extends Error {
  constructor(message) {
    message = message || 'Запрашиваемый ресурс не найден';
    super(message);

    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
