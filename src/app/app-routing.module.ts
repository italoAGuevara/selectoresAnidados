import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisesRoutingModule } from './paises/paises-routing.module';

const routes: Routes = [
  {
    path: 'paises',
    loadChildren: () => PaisesRoutingModule
  },
  {
    path: '**',
    redirectTo : 'paises'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
