class UnauthorizedError extends Error {
  constructor(message) {
    message = message || 'Нет доступа к запрашиваемому ресурсу';
    super(message);

    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
