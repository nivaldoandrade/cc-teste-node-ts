import { uuid } from 'uuidv4';

import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import Address from '@modules/addresses/infra/typeorm/entities/Address';
import IAddressesRepository from '../IAddressesRepository';

class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async create({
    user,
    street,
    address_number,
    complement,
    zip_code,
    city,
    state,
  }: ICreateAddressDTO): Promise<Address> {
    const address = new Address();
    Object.assign(address, {
      id: uuid(),
      user,
      street,
      address_number,
      complement,
      zip_code,
      city,
      state,
    });

    this.addresses.push(address);

    return address;
  }

  public async update(address: Address): Promise<Address> {
    const findIndexAddress = this.addresses.findIndex(
      findUser => findUser.id === address.id,
    );

    this.addresses[findIndexAddress] = address;

    return address;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const findAddress = this.addresses.find(address => address.id === id);

    return findAddress;
  }

  public async findAll(user_id: string): Promise<Address[] | undefined> {
    let { addresses } = this;

    addresses = addresses.filter(address => address.user.id === user_id);

    return addresses;
  }

  public async delete(id: string): Promise<void> {
    const indexAddress = this.addresses.findIndex(address => address.id === id);

    if (indexAddress > -1) {
      this.addresses.splice(indexAddress, 1);
    }
  }
}

export default FakeAddressesRepository;
