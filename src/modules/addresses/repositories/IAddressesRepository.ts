import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import Address from '../infra/typeorm/entities/Address';

export default interface IAddressesRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  update(address: Address): Promise<Address>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Address | undefined>;
  findAll(user_id: string): Promise<Address[] | undefined>;
}
