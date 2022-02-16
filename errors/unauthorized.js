class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'Нет доступа к запрашиваемому ресурсу');

    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
