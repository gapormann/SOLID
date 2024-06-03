import {expect, test} from '@jest/globals';
import { UserRepository } from '../../UserRepository';
import { MakeUser } from './MakeUser';
test('Should make a user', async () => {
  const userRepository = new UserRepository();
  const makeUser = new MakeUser(userRepository);
  const inputMakeUser = {
    nickName: 'test user',
    email: 'test@test.com',
    password: 'senhateste',
  }
  const outputMakeUser = await makeUser.execute(inputMakeUser);
  expect(outputMakeUser.userId).toBeDefined();
})