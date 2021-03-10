import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, classToPlain } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const { user, address } = await createUserService.execute({
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
    });

    return response.json({
      user: classToClass(user),
      address: classToClass(address),
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      telephone,
      email,
      password,
      old_password,
      age,
      weight,
      ethnicity,
    } = request.body;

    const { id } = request.user;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      id,
      name,
      telephone,
      email,
      password,
      old_password,
      age,
      weight,
      ethnicity,
    });

    return response.json(classToPlain(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute(id);

    return response.json(classToClass(user));
  }

  public async showProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;

    const showProfileUserService = container.resolve(ShowProfileUserService);

    const user = await showProfileUserService.execute(id);

    return response.json(classToPlain(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute(id);

    return response.status(202).json('User successfully deleted');
  }
}
