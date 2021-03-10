import DeleteAddressService from '@modules/addresses/services/DeleteAddressService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAddressesRepository from '@modules/addresses/repositories/fakes/FakeAddressesRepository';

import AppError from '@shared/errors/AppError';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let deleteAddressService: DeleteAddressService;

describe('DeleteAddressService', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    deleteAddressService = new DeleteAddressService(fakeAddressesRepository);
  });

  it('should be able to delete address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    const address = await fakeAddressesRepository.create({
      user,
      street: 'Rua Teste',
      address_number: 20,
      complement: 'Casa',
      zip_code: '12345678',
      city: 'São Carlos',
      state: 'São Paulo',
    });

    await expect(
      deleteAddressService.execute({ id: address.id, user_id: user.id }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete address if not found', async () => {
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
      deleteAddressService.execute({
        id: 'non-existing-addressId',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete address if not match user.id with address.user.id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe2',
      telephone: '123456789',
      email: 'johndoe2@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    const address = await fakeAddressesRepository.create({
      user,
      street: 'Rua Teste',
      address_number: 20,
      complement: 'Casa',
      zip_code: '12345678',
      city: 'São Carlos',
      state: 'São Paulo',
    });

    await expect(
      deleteAddressService.execute({
        id: address.id,
        user_id: user2.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
