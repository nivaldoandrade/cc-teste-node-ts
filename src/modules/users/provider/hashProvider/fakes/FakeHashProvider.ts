import IHashProvider from '../models/IHashProvider';

export default class BcryptHaskProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(
    payload: string,
    hashCompare: string,
  ): Promise<boolean> {
    return payload === hashCompare;
  }
}
