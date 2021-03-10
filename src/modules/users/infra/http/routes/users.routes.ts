import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controller/UsersController';
import authenticated from '../middlewares/authenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      telephone: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      age: Joi.number().required(),
      weight: Joi.number().required(),
      ethnicity: Joi.string()
        .valid('branco', 'negro', 'indigena', 'pardo', 'amarelo')
        .required(),
      street: Joi.string(),
      address_number: Joi.number(),
      complement: Joi.string(),
      zip_code: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
    },
  }),
  usersController.create,
);

usersRouter.get('/', authenticated, usersController.show);

usersRouter.get('/profile/', authenticated, usersController.showProfile);

usersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      telephone: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.number().required(),
      weight: Joi.number().required(),
      ethnicity: Joi.string()
        .valid('branco', 'negro', 'indigena', 'pardo', 'amarelo')
        .required(),
      old_password: Joi.string(),
      password: Joi.string().when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      password_confirmation: Joi.string()
        .when('password', {
          is: Joi.required(),
          then: Joi.required(),
          otherwise: Joi.optional(),
        })
        .valid(Joi.ref('password')),
    },
  }),
  authenticated,
  usersController.update,
);

usersRouter.delete('/', authenticated, usersController.delete);

export default usersRouter;
