export default interface ICreateUserDTO {
  name: string;
  telephone: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  ethnicity: 'branco' | 'negro' | 'indigena' | 'pardo' | 'amarelo';
}
