import { inject, injectable } from 'tsyringe';

import Address from '../infra/typeorm/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  address_id: string;
  street: string;
  address_number: number;
  complement: string;
  zip_code: string;
  city: string;
  state: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({
    user_id,
    address_id,
    street,
    address_number,
    complement,
    zip_code,
    city,
    state,
  }: IRequest): Promise<Address> {
    const address = await this.addressesRepository.findById(address_id);

    if (!address) {
      throw new AppError('Address is not found');
    }

    if (address.user.id !== user_id) {
      throw new AppError('Address is not found', 401);
    }

    Object.assign(address, {
      street,
      address_number,
      complement,
      zip_code,
      city,
      state,
    });

    await this.addressesRepository.update(address);

    return address;
  }
}

export default UpdateAddressService;
