import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path:'',
    loadChildren:()=> import('./pages/main/main.module').then((m)=> m.MainModule),
    
   },
   {path:'**',
   loadChildren:()=> import('./pages/not-found/not-found.module').then((m)=> m.NotFoundModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
