export class IncorrectPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IncorrectPasswordError";
  }
}

export class InvalidUsernameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUsernameError";
  }
}

export class RequirePasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequirePasswordError";
  }
}

export class RequireUsernameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequireUsernameError";
  }
}
