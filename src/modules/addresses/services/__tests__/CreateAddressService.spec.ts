import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAddressesRepository from '@modules/addresses/repositories/fakes/FakeAddressesRepository';

import AppError from '@shared/errors/AppError';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let createAddressService: CreateAddressService;

describe('CreateAddressService', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createAddressService = new CreateAddressService(
      fakeUsersRepository,
      fakeAddressesRepository,
    );
  });

  it('should be able to create new address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    const address = await createAddressService.execute({
      user_id: user.id,
      street: 'Rua Teste',
      address_number: 20,
      complement: 'Casa',
      zip_code: '12345678',
      city: 'São Carlos',
      state: 'São Paulo',
    });

    expect(address).toHaveProperty('id');
  });

  it('should not be able to create new address if user non-existing', async () => {
    await expect(
      createAddressService.execute({
        user_id: 'non-id',
        street: 'Rua Teste',
        address_number: 20,
        complement: 'Casa',
        zip_code: '12345678',
        city: 'São Carlos',
        state: 'São Paulo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
