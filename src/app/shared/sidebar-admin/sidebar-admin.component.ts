import { Component, EventEmitter, Output } from '@angular/core';

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

  disabledMenu(){
    !this.menu ? this.menu = true : this.menu = false;
    this.changeMenu.emit(this.menu);
  }
}
