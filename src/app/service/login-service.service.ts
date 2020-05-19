import { AppConstants } from './../app-constants';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';





@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }


  login(usuario) {
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {

      var token = (JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]);

      localStorage.setItem('token', token);
      console.info('token: ' + localStorage.getItem('token'));
      this.router.navigate(['home']);

    },
      error => {
        console.log('Erro ao fazer Login');
        alert('Acesso Negado');
      }
    );
  }
}
