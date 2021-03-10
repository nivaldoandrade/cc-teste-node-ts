import ShowAddressService from '@modules/addresses/services/ShowAddressService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAddressesRepository from '@modules/addresses/repositories/fakes/FakeAddressesRepository';

import AppError from '@shared/errors/AppError';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let showAddressService: ShowAddressService;

describe('ShowAddressService', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    showAddressService = new ShowAddressService(fakeAddressesRepository);
  });

  it('should be able to show addresses', async () => {
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

    const addresses = await showAddressService.execute(user.id);

    expect(addresses).toEqual([address]);
  });

  it('should not be able to show address if user is not found', async () => {
    await expect(
      showAddressService.execute('no-existing-userId'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
