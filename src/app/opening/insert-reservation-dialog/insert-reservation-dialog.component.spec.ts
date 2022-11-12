import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertReservationDialogComponent } from './insert-reservation-dialog.component';

describe('InsertReservationDialogComponent', () => {
  let component: InsertReservationDialogComponent;
  let fixture: ComponentFixture<InsertReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertReservationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InsertReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
