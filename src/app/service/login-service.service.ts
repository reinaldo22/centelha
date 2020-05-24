import { Usuario } from './../model/usuario';
import { AppConstants } from './../app-constants';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';





@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  recuperar(login) {

    const user = new Usuario();
    user.login = login;

    return this.http.post(AppConstants.getBaseUrlPath + 'recuperar/', user).subscribe(data => {
      alert(JSON.parse(JSON.stringify(data)).error);

    },
      error => {
        console.error('Erro ao recuperar login');
        alert('Erro ao recuperar Login!');
      }
    );

  }

  login(usuario) {
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {

      const token = (JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]);

      localStorage.setItem('token', token);

      this.router.navigate(['home']);

    },
      error => {
        console.log('Erro ao fazer Login');
        alert('Acesso Negado');
      }
    );
  }
}
