class ForbiddenError extends Error {
  constructor(message) {
    message = message || 'Доступ к указанному ресурсу ограничен';
    super(message);

    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
