import { User } from '../../User';
import { UserRepository } from '../../UserRepository';

export class MakeUser {
  constructor (private readonly userRepository: UserRepository) {}

  async execute({ nickName, email, password }: Input): Promise<Output> {
    const user = User.create(nickName, email, password);
    await this.userRepository.save(user);
    return { userId: user.id };
  }
}

type Input = {
  nickName: string;
  email: string;
  password: string;
}

type Output = {
  userId: string;
}