import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../provider/hashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  telephone: string;
  email: string;
  password?: string;
  old_password?: string;
  age: number;
  weight: number;
  ethnicity: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    telephone,
    email,
    password,
    old_password,
    age,
    weight,
    ethnicity,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User is not found');
    }

    if (password && !old_password) {
      throw new AppError('You need to enter the old password');
    }

    if (password && old_password) {
      const comparePassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!comparePassword) {
        throw new AppError('You need enter the old password correctly');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists && userEmailExists.id !== user.id) {
      throw new AppError('E-mail already used');
    }

    Object.assign(user, { name, email, telephone, age, weight, ethnicity });

    return this.usersRepository.update(user);
  }
}

export default UpdateUserService;
