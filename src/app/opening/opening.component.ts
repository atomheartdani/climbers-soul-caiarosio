import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Opening } from '@app/@shared/models/opening.model';
import { AuthenticationGuard } from '@app/auth';
import { InsertReservationDialogComponent } from './insert-reservation-dialog/insert-reservation-dialog.component';
import { OpeningDetailDialogComponent } from './opening-detail-dialog/opening-detail-dialog.component';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss'],
})
export class OpeningComponent implements OnInit {
  @Input() opening: Opening;

  constructor(
    private dialog: MatDialog,
    private authGuard: AuthenticationGuard,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  insertReservation(): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const dialogRef = this.dialog.open(InsertReservationDialogComponent, { data: this.opening });
      dialogRef.afterClosed().subscribe((result) => {
        // TODO reload all openings
      });
    }
  }

  manage(): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const dialogRef = this.dialog.open(OpeningDetailDialogComponent, { data: this.opening });
      dialogRef.afterClosed().subscribe((result) => {
        // TODO reload all openings
      });
    }
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

  get isSpecialEvent(): boolean {
    return !!this.opening.special;
  }
}
