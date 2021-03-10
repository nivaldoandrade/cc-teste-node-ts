import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import Address from '@modules/addresses/infra/typeorm/entities/Address';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../provider/hashProvider/models/IHashProvider';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';

interface IRequest {
  name: string;
  telephone: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  ethnicity: 'branco' | 'negro' | 'indigena' | 'pardo' | 'amarelo';
  street?: string;
  address_number?: number;
  complement?: string;
  zip_code?: string;
  city?: string;
  state?: string;
}

interface IResponse {
  user: User;
  address?: Address;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({
    name,
    telephone,
    email,
    password,
    age,
    weight,
    ethnicity,
    street,
    address_number,
    complement,
    zip_code,
    city,
    state,
  }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('This email is already being used');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      telephone,
      email,
      password: hashPassword,
      age,
      weight,
      ethnicity,
    });

    let address: Address;

    if (street && address_number && complement && zip_code && city && state) {
      address = await this.addressesRepository.create({
        user,
        street,
        address_number,
        complement,
        zip_code,
        city,
        state,
      });

      return {
        user,
        address,
      };
    }

    return {
      user,
    };
  }
}

export default CreateUserService;
