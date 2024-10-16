import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./paginas/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./paginas/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'comunidad',
    loadChildren: () => import('./paginas/comunidad/comunidad.module').then( m => m.ComunidadPageModule)
  },

  {
    path: 'calculadora-macros',
    loadChildren: () => import('./paginas/calculadora-macros/calculadora-macros.module').then( m => m.CalculadoraMacrosPageModule)
  },
  {
    path: 'prueba',
    loadChildren: () => import('./paginas/prueba/prueba.module').then( m => m.PruebaPageModule)
  },
  {
    path: 'publicacion',
    loadChildren: () => import('./paginas/publicacion/publicacion.module').then( m => m.PublicacionPageModule)
  },
  {
    path: 'publicar',
    loadChildren: () => import('./paginas/publicar/publicar.module').then( m => m.PublicarPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./paginas/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
