import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Address from '../infra/typeorm/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';

@injectable()
class ShowAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(user_id: string): Promise<Address[]> {
    const addresses = await this.addressesRepository.findAll(user_id);

    if (!addresses || addresses.length === 0) {
      throw new AppError('Address is not found');
    }
    return addresses;
  }
}

export default ShowAddressService;
