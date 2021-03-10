import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/provider/hashProvider/fakes/FakeHashProvider';
import UpdateProfileUserService from '@modules/users/services/UpdateUserService';

import AppError from '@shared/errors/AppError';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfileUserService: UpdateProfileUserService;

describe('UpdateProfileUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateProfileUserService = new UpdateProfileUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    const updatedUser = await updateProfileUserService.execute({
      id: user.id,
      name: 'John Due',
      email: 'johndue@email.com',
      telephone: '123456789',
      age: 2,
      weight: 1,
      ethnicity: 'pardo',
    });

    expect(updatedUser.name).toBe('John Due');
    expect(updatedUser.email).toBe('johndue@email.com');
  });

  it('should not be albe update the user if non-exists user', async () => {
    await expect(
      updateProfileUserService.execute({
        id: 'non-exists-user',
        name: 'John Due',
        email: 'johndue@email.com',
        telephone: '123456789',
        age: 2,
        weight: 1,
        ethnicity: 'pardo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able change the email for antoher email exist', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe2',
      telephone: '123456789',
      email: 'johndoe2@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    await expect(
      updateProfileUserService.execute({
        id: user.id,
        name: 'John Doe2',
        email: 'johndoe@email.com',
        telephone: '123456789',
        age: 2,
        weight: 1,
        ethnicity: 'pardo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update user without alter email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe2',
      telephone: '123456789',
      email: 'johndoe2@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    const updatedUser = await updateProfileUserService.execute({
      id: user.id,
      name: 'John Doe3',
      email: 'johndoe2@email.com',
      telephone: '123456789',
      age: 2,
      weight: 1,
      ethnicity: 'pardo',
    });

    expect(updatedUser.name).toBe('John Doe3');
    expect(updatedUser.email).toBe('johndoe2@email.com');
  });

  it('should be able update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    const updatedUser = await updateProfileUserService.execute({
      id: user.id,
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      old_password: '123',
      telephone: '123456789',
      age: 2,
      weight: 1,
      ethnicity: 'pardo',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it('should not be able update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    await expect(
      updateProfileUserService.execute({
        id: user.id,
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
        old_password: '',
        telephone: '123456789',
        age: 2,
        weight: 1,
        ethnicity: 'pardo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update new password with old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    const updatedUser = await updateProfileUserService.execute({
      id: user.id,
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      old_password: '123',
      telephone: '123456789',
      age: 2,
      weight: 1,
      ethnicity: 'pardo',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it('should not be able update new password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    await expect(
      updateProfileUserService.execute({
        id: user.id,
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
        old_password: '321',
        telephone: '123456789',
        age: 2,
        weight: 1,
        ethnicity: 'pardo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
