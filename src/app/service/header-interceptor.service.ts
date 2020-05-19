import { HttpInterceptor, HTTP_INTERCEPTORS, HttpClientModule, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/*interceptador de login para envio de token*/

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {


  intercept(req: import('@Angular/common/http').HttpRequest<any>,
    next: import('@Angular/common/http').HttpHandler): import('rxjs').Observable<import('@Angular/common/http').HttpEvent<any>> {

    /*SE MEU TOKEN FOR DIFERENTE DE NULO*/
    if (localStorage.getItem('token') != null) {

      /*EU VOU UNIR O Bearer com o token*/
      const token = 'Bearer' + localStorage.getItem('token'); /*Bearer : 163214368465454635gh35g4h3c54h3g5h*/

      /*PASSA O TOKEN NO CABEÇALHO*/
      const tokenRequest = req.clone({ /*RESGATA A REQUISICAO*/
        headers: req.headers.set('Authorization', token)
      });

      /*PASSA O CABEÇACLHO DE REQUISICAO*/
      return next.handle(tokenRequest).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
            console.info('sucesso na operacão');
          }
        })
        , catchError(this.processarError));
    } else {
      /*SE NÃO TEM TOKEN PASSA A REQUISIÇÃO ORIGINAL*/
      return next.handle(req).pipe(catchError(this.processarError));
    }

  }



  constructor() { }

  processarError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'error: ' + error.error.error;
    } else {
      errorMessage = 'Código: ' + error.error.code + '\nMensagem :' + error.error.error;

    }
    window.alert(errorMessage);
    return throwError(errorMessage);

  }
}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },
  ],
})

export class HttpInterceptorModule {

}
