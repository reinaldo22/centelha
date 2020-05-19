import { Telefone } from './telefone';
export class Usuario {

  id: number;
  login: string;
  nome: string;
  cpf: string;
  senha: string;

  telefones: Array<Telefone>;
}
