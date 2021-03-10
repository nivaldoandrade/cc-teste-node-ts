import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AddressesController from '../controller/AddressesController';
import authenticated from '@modules/users/infra/http/middlewares/authenticated';

const addressesController = new AddressesController();

const addressesRouter = Router();

addressesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      street: Joi.string().required(),
      address_number: Joi.number().required(),
      complement: Joi.string().required(),
      zip_code: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    },
  }),
  authenticated,
  addressesController.create,
);
addressesRouter.get('/', authenticated, addressesController.show);
addressesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      address_id: Joi.string().uuid().required(),
      street: Joi.string().required(),
      address_number: Joi.number().required(),
      complement: Joi.string().required(),
      zip_code: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    },
  }),
  authenticated,
  addressesController.update,
);
addressesRouter.delete('/', authenticated, addressesController.delete);

export default addressesRouter;
