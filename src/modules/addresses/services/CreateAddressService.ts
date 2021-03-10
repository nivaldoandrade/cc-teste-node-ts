import { inject, injectable } from 'tsyringe';

import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Address from '@modules/addresses/infra/typeorm/entities/Address';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  street: string;
  address_number: number;
  complement: string;
  zip_code: string;
  city: string;
  state: string;
}

@injectable()
class CreateAddressService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({
    user_id,
    street,
    address_number,
    complement,
    zip_code,
    city,
    state,
  }: IRequest): Promise<Address> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User is not found');
    }

    const address = await this.addressesRepository.create({
      user,
      street,
      address_number,
      complement,
      zip_code,
      city,
      state,
    });

    return address;
  }
}

export default CreateAddressService;
