class ForbiddenError extends Error {
  constructor(message) {
    super(message || 'Доступ к указанному ресурсу ограничен');

    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
