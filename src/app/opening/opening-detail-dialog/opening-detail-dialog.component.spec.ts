import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningDetailDialogComponent } from './opening-detail-dialog.component';

describe('OpeningDetailDialogComponent', () => {
  let component: OpeningDetailDialogComponent;
  let fixture: ComponentFixture<OpeningDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpeningDetailDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpeningDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
