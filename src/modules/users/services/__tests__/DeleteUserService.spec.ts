import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import DeleteUserService from '@modules/users/services/DeleteUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUserService = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able to delete user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    await expect(deleteUserService.execute(user.id)).resolves.not.toThrow();
  });

  it('should not be able to delete user with non-existing', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    await expect(deleteUserService.execute('non-id')).rejects.toBeInstanceOf(
      AppError,
    );
    expect(user).toHaveProperty('id');
  });
});
