import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateAddressDTO {
  user: User;
  street: string;
  address_number: number;
  complement: string;
  zip_code: string;
  city: string;
  state: string;
}
