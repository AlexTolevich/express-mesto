class BadRequest extends Error {
  constructor(message) {
    message = message || 'Недействительный синтаксис запроса';
    super(message);

    this.statusCode = 400;
  }
}

module.exports = BadRequest;
