import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, classToPlain } from 'class-transformer';

import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import UpdateAddressService from '@modules/addresses/services/UpdateAddressService';
import ShowAddressService from '@modules/addresses/services/ShowAddressService';
import DeleteAddressService from '@modules/addresses/services/DeleteAddressService';

export default class AddressesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      street,
      address_number,
      complement,
      zip_code,
      city,
      state,
    } = request.body;

    const user_id = request.user.id;

    const createAddressService = container.resolve(CreateAddressService);

    const address = await createAddressService.execute({
      user_id,
      street,
      address_number,
      complement,
      zip_code,
      city,
      state,
    });

    return response.json(classToClass(address));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      address_id,
      street,
      address_number,
      complement,
      zip_code,
      city,
      state,
    } = request.body;

    const user_id = request.user.id;

    const updateAddressService = container.resolve(UpdateAddressService);

    const address = await updateAddressService.execute({
      user_id,
      address_id,
      street,
      address_number,
      complement,
      zip_code,
      city,
      state,
    });

    return response.json(classToClass(address));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showAddressService = container.resolve(ShowAddressService);

    const address = await showAddressService.execute(user_id);

    return response.json(classToClass(address));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const user_id = request.user.id;

    const deleteAddressService = container.resolve(DeleteAddressService);

    await deleteAddressService.execute({ id, user_id });

    return response.json('Address successfully deleted');
  }
}
