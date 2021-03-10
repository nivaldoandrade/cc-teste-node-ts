import { container } from 'tsyringe';

import IHashProvider from './hashProvider/models/IHashProvider';
import BcrytHashProvider from './hashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcrytHashProvider);
