import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as UserAdminActions from './store/users.actions';
import * as UserSearchActions from './store/usersSearch.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnDestroy {
  public userAdmin: any[] = [];
  public userAdminComplete: any = {};
  public userAdminPagination: any = {};
  public searchForm: FormGroup;
  private subscriptions = new Subscription();
  private isSearching: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<{ usersSearch: any, userAdmin: any }>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
    this.subscriptions.add(
      this.store
        .select('userAdmin')
        .subscribe((userAdmin) => {
          if (!this.isSearching) {
            this.userAdminComplete = userAdmin;
            this.userAdmin = userAdmin.data;
            this.userAdminPagination = userAdmin.pageable;
          }
        })
    );
    this.subscriptions.add(
      this.store
        .select('usersSearch')
        .subscribe((usersSearch) => {
          if (this.isSearching) {
            this.userAdminComplete = usersSearch;
            this.userAdmin = usersSearch.data;
            this.userAdminPagination = usersSearch.pageable;
          }
        }))
    this.userAdminPagination = {
      size: 2,
      page: 0
    };

    this.store.dispatch(UserAdminActions.loadUsers({ pageable: this.userAdminPagination }));

  }
  public viewUser(id: number): void {
    this.router.navigate([`admin/dashboard/user/view/${id}`]);
    this.store.dispatch(UserAdminActions.loadUserById({ id }));
  }
  public search(): void {
    const filter = this.searchForm.value.search;
    this.userAdminPagination = {
      size: 2,
      page: 0
    };

    if (filter != "") {
      this.isSearching = true;
      this.store.dispatch(UserSearchActions.loadUsersByDni({ dni: filter, pageable: this.userAdminPagination }));
    } else {
      this.isSearching = false;
      this.store.dispatch(UserAdminActions.loadUsers({ pageable: this.userAdminPagination }));
    }
  }
  public pageChange(event: any): void {
    if (!Number.isNaN(event)) {
      this.userAdminPagination = {
        size: 2,
        page: event != 0 ? event - 1 : 0
      };
    }
    this.store.dispatch(UserAdminActions.loadUsers({ pageable: this.userAdminPagination }));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
