import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubirImagenComponent } from './subir-imagen/subir-imagen.component';

const routes: Routes = [
  {
    path: 'subir-imagen',
    component: SubirImagenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
