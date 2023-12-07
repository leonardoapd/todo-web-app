export class UserCredentials {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    if (typeof value !== "string") {
      throw new TypeError("Email must be a string");
    }
    this._email = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    if (typeof value !== "string") {
      throw new TypeError("Password must be a string");
    }
    this._password = value;
  }
}
