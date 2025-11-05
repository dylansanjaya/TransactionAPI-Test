export class errorThrower extends Error {
  constructor(message, code = 500, status = 1) {
    super(message);
    this.code = code;      // HTTP status code
    this.status = status;  // Custom app-level status
  }
}