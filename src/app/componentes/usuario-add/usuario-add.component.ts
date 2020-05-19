import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { Telefone } from 'src/app/model/telefone';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {


  usuario = new Usuario();
  telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }
  /*Carrega a pagina e se caso tenha algum id na url*/
  ngOnInit() {
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
