import { UserCredentials } from "./user-credentials";

export class UserInfo extends UserCredentials {
  constructor(email, password, firstName, lastName, bio, avatarUrl) {
    super(email, password);
    this.firstName = firstName;
    this.lastName = lastName;
    this.bio = bio;
    this.avatarUrl = avatarUrl;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(value) {
    if (typeof value !== "string") {
      throw new TypeError("First name must be a string");
    }
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value) {
    if (typeof value !== "string") {
      throw new TypeError("Last name must be a string");
    }
    this._lastName = value;
  }

  get bio() {
    return this._bio;
  }

  set bio(value) {
    if (typeof value !== "string") {
      throw new TypeError("Bio must be a string");
    }
    this._bio = value;
  }

  get avatarUrl() {
    return this._avatarUrl;
  }

  set avatarUrl(value) {
    if (typeof value !== "string") {
      throw new TypeError("Avatar URL must be a string");
    }
    this._avatarUrl = value;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value) {
    if (typeof value !== "string") {
      throw new TypeError("Full name must be a string");
    }
    const [firstName, lastName] = value.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get initials() {
    return `${this.firstName[0]}${this.lastName[0]}`;
  }

  toJSON() {
    return {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      bio: this.bio,
      avatarUrl: this.avatarUrl,
    };
  }

  static fromJSON(json) {
    const {
      email,
      password,
      firstName,
      lastName,
      bio,
      avatarUrl,
    } = json;
    return new UserInfo(
      email,
      password,
      firstName,
      lastName,
      bio,
      avatarUrl
    );
  }
}