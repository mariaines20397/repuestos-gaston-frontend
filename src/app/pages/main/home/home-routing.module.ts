import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [ {
  path: '',
  component: HomeComponent,
  children: [
    // Aquí puedes agregar las rutas hijas de 'home'
    // { path: 'child1', component: Child1Component },
    // { path: 'child2', component: Child2Component },
    // ...
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
