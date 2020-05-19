import { UsuarioAddComponent } from './componentes/usuario-add/usuario-add.component';
import { UsuarioComponent } from './componentes/usuario.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrMaskerModule } from 'br-mask';
import { GuardiaoGuard } from './service/guardiao.guard';

export const appRouters: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'usuarios', component: UsuarioComponent, canActivate: [GuardiaoGuard] },
  { path: 'usuariosAdd', component: UsuarioAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'usuariosAdd/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuard] },


];
export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuarioComponent,
    UsuarioAddComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    BrMaskerModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
