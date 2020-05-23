import { Profissao } from './../../model/profissao';
import { Usuario } from './../../model/usuario';
import { Component, OnInit, Injectable } from '@angular/core';
import { Telefone } from 'src/app/model/telefone';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class FormateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {

        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;

  }
  toModel(date: NgbDateStruct): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

}

/*implementa a uma classe de formatação de data*/
@Injectable()
export class FormaTadata extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  /*responsável por formatar a entrada de dados para um json*/
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }
  /*pega esse json e formata para ser aprensetávvel*/
  format(date: NgbDateStruct): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
  /*toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }*/

}


@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormaTadata },
  { provide: NgbDateAdapter, useClass: FormateAdapter },
  ]
})
export class UsuarioAddComponent implements OnInit {


  usuario = new Usuario();
  telefone = new Telefone();
  profissoes = new Profissao();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }
  /*Carrega a pagina e se caso tenha algum id na url*/
  ngOnInit() {

    this.userService.getProfissaoList().subscribe(data => {
      this.profissoes = data;

    });

    const id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.buscaPorId(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }
  salvar() {
    /*Se caso tenha um ID atualiza*/
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.log('Atualizado com sucesso!!!' + data);
      });
      /*Se caso não tem um ID salva*/
    } else {
      this.userService.salvarUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.log('Usuario salvo!! ' + data);
      });

    }
  }
  deletarTelefone(id, i) {

    if (id == null) {
      this.usuario.telefones.splice(i, i);
      return;
    }
    if (id !== null && confirm('Deseja remover?')) {
      this.userService.removerTelefone(id).subscribe(data => {

        this.usuario.telefones.splice(i, 1);

        console.log('Telefone removido = ' + data);
      });
    }
  }
  addFone() {

    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }
    this.usuario.telefones.push(this.telefone);

    this.telefone = new Telefone();

  }
  novo() {
    this.usuario = new Usuario();
    this.telefone = new Telefone();
  }


}
