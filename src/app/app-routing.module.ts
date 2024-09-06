import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./paginas/signup/signup.module').then( m => m.SignupPageModule)
  },  {
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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
