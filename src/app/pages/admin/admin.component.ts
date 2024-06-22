import { Component } from '@angular/core';

@Component({
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent {
 public menu:boolean = false;

 public cssClassMenu(menu: boolean): string {
  return !menu? 'd-block col-2 p-0 app-sidebar' : 'd-block p-0 min-sidebar'
 }

 public cssClassCol(menu: boolean): string {
  return !menu? 'col-10' : ' col-sidebar'
 }
}