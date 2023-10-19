import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSalesComponent } from './table-sales.component';

describe('TableSalesComponent', () => {
  let component: TableSalesComponent;
  let fixture: ComponentFixture<TableSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSalesComponent]
    });
    fixture = TestBed.createComponent(TableSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
