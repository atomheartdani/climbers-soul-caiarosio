import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Opening } from '@app/@shared/models/opening.model';
import { InsertReservationDialogComponent } from './insert-reservation-dialog/insert-reservation-dialog.component';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss'],
})
export class OpeningComponent implements OnInit {
  @Input() opening: Opening;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  insertReservation(): void {
    const dialogRef = this.dialog.open(InsertReservationDialogComponent, { data: this.opening });
    dialogRef.afterClosed().subscribe((result) => {
      // TODO reload all openings
    });
  }

  get spaceAvaiable(): boolean {
    return this.opening.reservations.length < 4;
  }

  get spaceAlmostFull(): boolean {
    return this.opening.reservations.length >= 4 && this.opening.reservations.length < 8;
  }

  get spaceFull(): boolean {
    return this.opening.reservations.length >= 8;
  }
}
