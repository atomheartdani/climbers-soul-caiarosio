import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReservationDialogComponent } from './delete-reservation-dialog.component';

describe('DeleteReservationDialogComponent', () => {
  let component: DeleteReservationDialogComponent;
  let fixture: ComponentFixture<DeleteReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteReservationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
