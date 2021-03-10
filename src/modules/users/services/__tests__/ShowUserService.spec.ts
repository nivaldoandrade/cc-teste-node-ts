import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowUserService from '@modules/users/services/ShowUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showUserService: ShowUserService;

describe('ShowUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserService = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to show user with addresses', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    const userWithAddresses = await showUserService.execute(user.id);

    expect(userWithAddresses.name).toBe('John Doe');
  });

  it('should not be able to show user if non-existing', async () => {
    await expect(showUserService.execute('non-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
