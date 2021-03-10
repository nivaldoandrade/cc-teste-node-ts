import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';
import FakeHashProvider from '@modules/users/provider/hashProvider/fakes/FakeHashProvider';
import FakeAddressesRepository from '@modules/addresses/repositories/fakes/FakeAddressesRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let showProfileUserService: ShowProfileUserService;

describe('ShowProfileUserService', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeAddressesRepository,
    );
    showProfileUserService = new ShowProfileUserService(fakeUsersRepository);
  });

  it('should be able to show user', async () => {
    const { user } = await createUserService.execute({
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

    const UserProfile = await showProfileUserService.execute(user.id);

    expect(UserProfile.name).toBe('John Doe');
    expect(UserProfile.age).toBe(25);
  });

  it('should not be able to show user if non-existing', async () => {
    await expect(
      showProfileUserService.execute('non-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
