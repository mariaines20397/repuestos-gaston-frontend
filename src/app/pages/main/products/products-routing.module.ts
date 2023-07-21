import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path:'categories/:id', 
  
  component:ProductsComponent,
    },
    {path:':id', 
  
  component:ProductComponent,
    },
    {path:'', 
  
  component:ProductsComponent,
    },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
