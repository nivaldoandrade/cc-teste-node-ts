import { uuid } from 'uuidv4';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
    age,
    telephone,
    weight,
    ethnicity,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
      age,
      telephone,
      weight,
      ethnicity,
    });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findByIdWithAddresses(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async update(user: User): Promise<User> {
    const findIndexUser = this.users.findIndex(
      findUser => findUser.id === user.id,
    );

    this.users[findIndexUser] = user;

    return user;
  }

  public async delete(id: string): Promise<void> {
    const indexUser = this.users.findIndex(user => user.id === id);

    if (indexUser > -1) {
      this.users.splice(indexUser, 1);
    }
  }
}

export default FakeUsersRepository;
