import { AppConstants } from './../app-constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


  getUsuarioList(): Observable<any> {

    return this.http.get<any>(AppConstants.baseUrl);
  }

  getUsuarioPage(pagina): Observable<any> {

    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }
  deletarUsuario(id: number): Observable<any> {

    return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' });
  }
  buscaNome(nome: string): Observable<any> {

    return this.http.get(AppConstants.baseUrl + 'buscaNome/' + nome);
  }

  buscaPorId(id): Observable<any> {

    return this.http.get<any>(AppConstants.baseUrl + id);
  }
  salvarUsuario(user): Observable<any> {

    return this.http.post<any>(AppConstants.baseUrl, user);
  }
  updateUsuario(user): Observable<any> {

    return this.http.put<any>(AppConstants.baseUrl, user);
  }
  userAutenticado() {
    if (localStorage.getItem('token') != null && localStorage.getItem('token').toString().trim() != null) {
      return true;
    } else {
      return false;
    }
  }
  removerTelefone(id): Observable<any> {

    return this.http.delete(AppConstants.baseUrl + 'removeTelefone/' + id, { responseType: 'text' });
  }

  getProfissaoList(): Observable<any> {

    return this.http.get<any>(AppConstants.getBaseUrlPath + 'profissao/');
  }

  relatorioDownload() {
    return this.http.get(AppConstants.baseUrl + 'relatorio', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }
}
