import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { PriceFormatPipe } from './pipe/transformPrice.pipe';



@NgModule({
  declarations: [
    PriceFormatPipe
  ],
  imports: [
    CommonModule
  ],
  providers:[AuthService, PriceFormatPipe],
  exports:[
    PriceFormatPipe
  ]
})
export class CoreModule { }
