import UpdateAddressService from '@modules/addresses/services/UpdateAddressService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAddressesRepository from '@modules/addresses/repositories/fakes/FakeAddressesRepository';

import AppError from '@shared/errors/AppError';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let updateAddressService: UpdateAddressService;

describe('UpdateAddressService', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    updateAddressService = new UpdateAddressService(fakeAddressesRepository);
  });

  it('should be able to update address', async () => {
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

    const updatedAddress = await updateAddressService.execute({
      user_id: user.id,
      address_id: address.id,
      street: 'Rua Teste 21',
      address_number: 21,
      complement: 'Apt',
      zip_code: '87654321',
      city: 'São Bento',
      state: 'Rio de Janeiro',
    });

    expect(updatedAddress.street).toBe('Rua Teste 21');
    expect(updatedAddress.address_number).toBe(21);
    expect(updatedAddress.complement).toBe('Apt');
    expect(updatedAddress.zip_code).toBe('87654321');
    expect(updatedAddress.city).toBe('São Bento');
    expect(updatedAddress.state).toBe('Rio de Janeiro');
  });

  it('should not be able to update address if not found', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      telephone: '123456789',
      email: 'johndoe@email.com',
      password: '123',
      age: 25,
      weight: 165,
      ethnicity: 'indigena',
    });

    expect(
      updateAddressService.execute({
        user_id: user.id,
        address_id: 'non-existing-addressId',
        street: 'Rua Teste 21',
        address_number: 21,
        complement: 'Apt',
        zip_code: '87654321',
        city: 'São Bento',
        state: 'Rio de Janeiro',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update address if not match user.id with address.user.id', async () => {
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

    expect(
      updateAddressService.execute({
        user_id: user2.id,
        address_id: address.id,
        street: 'Rua Teste 21',
        address_number: 21,
        complement: 'Apt',
        zip_code: '87654321',
        city: 'São Bento',
        state: 'Rio de Janeiro',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
