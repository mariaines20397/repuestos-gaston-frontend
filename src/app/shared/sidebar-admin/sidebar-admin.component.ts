import { Component, EventEmitter, Output } from '@angular/core';
import * as LoginActions from 'src/app/pages/login/store/login.actions';

import { Store } from '@ngrx/store';
@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent {
  public isCollapsed: boolean = true;
  public isCollapsedVentas: boolean = true;
  public menu: boolean = false;
  @Output() changeMenu = new EventEmitter<boolean>();
  constructor(
    private store:Store
    ){}
  public disabledMenu() : void {
    this.menu ? this.menu = false : this.menu = true;
    this.changeMenu.emit(this.menu);
  }
  public logout() : void {
    this.store.dispatch(LoginActions.loadLogout());
  }
}
