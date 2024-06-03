import * as bcrypt from 'bcrypt';

export class User {
  constructor(
    readonly id: string,
    readonly nickName: string,
    readonly email: string,
    readonly password: string,
  ) {}

  static create(
    nickName: string,
    email: string,
    password: string,
  ): User {
    const id = crypto.randomUUID();
    const encryptedPassword = User.encryptPassword(password);
    return new User(id, nickName, email, encryptedPassword);
  }

  static encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }
}