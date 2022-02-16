class BadRequest extends Error {
  constructor(message) {
    super(message || 'Недействительный синтаксис запроса');

    this.statusCode = 400;
  }
}

module.exports = BadRequest;
