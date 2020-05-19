import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  usuarios: Array<Usuario[]>;
  nome: string;
  total: number;


  constructor(private usuarioServices: UsuarioService) { }

  ngOnInit() {
    this.usuarioServices.getUsuarioList().subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }

  deleteUsuario(id: number, index) {
    if (confirm('Deseja realmente excluir usuário?')) {
      this.usuarioServices.deletarUsuario(id).subscribe(data => {

        this.usuarios.splice(index, 1); /*REMOVE DA TELA*/

      });
    }

  }
  buscar() {
    if (this.nome === '') {
      this.usuarioServices.getUsuarioList().subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.usuarioServices.buscaNome(this.nome).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    }
  }

  carregarPagina(pagina) {
    this.usuarioServices.getUsuarioPage(pagina - 1).subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }
}
