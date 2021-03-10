import { hash, compare } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

export default class BycrypHAsProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(
    payload: string,
    hasCompare: string,
  ): Promise<boolean> {
    return compare(payload, hasCompare);
  }
}
