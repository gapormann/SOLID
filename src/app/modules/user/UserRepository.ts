import { User } from './User';
import pgp from 'pg-promise';

export interface UserRepositoryInterface {
  save (user: User): Promise<void>;
  findById(userId: string): Promise<User>;
}

export class UserRepository implements UserRepositoryInterface {
  async save(user: User): Promise<void> {
    const connection = pgp()('postgres://postgres:postgres@db:5432/postgres?schema=public')
    await connection.query('insert into users (id, nick_name, email, password) values ($1, $2, $3, $4)', [user.id, user.nickName, user.email, user.password])
    await connection.$pool.end();
  }

  async findById(userId: string): Promise<User> {
    const connection = pgp()('postgres://postgres:postgres@db:5432/postgres?schema=public')
    const [userData] = await connection.query(
      'select from users where id = $1',
      [userId]
    );
    await connection.$pool.end();
    return new User(userData.id, userData.nick_name, userData.email, userData.passwod)
  }
}