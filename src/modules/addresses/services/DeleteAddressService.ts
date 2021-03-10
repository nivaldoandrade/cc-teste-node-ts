import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAddressesRepository from '../repositories/IAddressesRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Address is not found');
    }

    if (address.user.id !== user_id) {
      throw new AppError('Address is not found', 401);
    }

    await this.addressesRepository.delete(id);
  }
}

export default DeleteAddressService;
