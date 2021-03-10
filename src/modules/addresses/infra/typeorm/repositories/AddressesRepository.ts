import { getRepository, Repository } from 'typeorm';

import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import Address from '../entities/Address';

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create({
    user,
    street,
    address_number,
    complement,
    zip_code,
    city,
    state,
  }: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      user,
      street,
      address_number,
      complement,
      zip_code,
      city,
      state,
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async update(address: Address): Promise<Address> {
    await this.ormRepository.save(address);

    return address;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne(id, {
      relations: ['user'],
    });

    return address;
  }

  public async findAll(user_id: string): Promise<Address[] | undefined> {
    const addresses = await this.ormRepository.find({
      where: {
        user: user_id,
      },
    });

    return addresses;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default AddressesRepository;
