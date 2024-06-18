import { Component, EventEmitter, Output } from '@angular/core';
import * as SearchActions from 'src/app/shared/navbar/store/search.actions'
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
  disabledMenu(){
    this.menu ? this.menu = false : this.menu = true;
    this.changeMenu.emit(this.menu);
  }
  logout(){
    this.store.dispatch(LoginActions.loadLogout());
  }
}
