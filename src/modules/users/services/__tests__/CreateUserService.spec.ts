import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/provider/hashProvider/fakes/FakeHashProvider';
import FakeAddressesRepository from '@modules/addresses/repositories/fakes/FakeAddressesRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeAddressesRepository,
    );
  });

  it('should be able to create new user', async () => {
    const { user } = await createUserService.execute({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create new user with address', async () => {
    const { user, address } = await createUserService.execute({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
      street: 'Rua Teste',
      address_number: 20,
      complement: 'Casa',
      zip_code: '12345678',
      city: 'São Carlos',
      state: 'São Paulo',
    });

    expect(user).toHaveProperty('id');
    expect(address).toHaveProperty('id');
  });

  it('should not be able to create new user with samme email as another', async () => {
    await createUserService.execute({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'pardo',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe2',
        telephone: '123456789',
        email: 'johndoe@email.com',
        password: '321',
        age: 23,
        weight: 175,
        ethnicity: 'pardo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
