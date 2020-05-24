import { Profissao } from './profissao';
import { Telefone } from './telefone';
export class Usuario {

  id: number;
  login: string;
  nome: string;
  cpf: string;
  senha: string;
  dataNascimento: string;
  salario: DoubleRange;
  profissao: Profissao =  new Profissao();
  telefones: Array<Telefone>;
}
