import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Opening } from '@app/@shared/models/opening.model';
import { CredentialsService } from '@app/@shared/services/credentials.service';
import { OpeningService } from '@app/@shared/services/opening.service';
import { OpeningDetailDialogComponent } from '@app/opening/opening-detail-dialog/opening-detail-dialog.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  openingsMap: Map<string, Opening[]> = new Map();
  isLoading: boolean = true;
  loadAll: boolean = false;

  constructor(
    private dialog: MatDialog,
    private openingService: OpeningService,
    private credentialsService: CredentialsService,
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  insertOpening(): void {
    const newOpening: Opening = {
      id: 0,
      date: '',
      from: '',
      to: '',
      special: '',
      maxReservations: 8,
      reservations: [],
    };

    const dialogRef = this.dialog.open(OpeningDetailDialogComponent, { data: newOpening });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  loadAllOpenings(): void {
    this.loadAll = true;
    this.refresh();
  }

  refresh(): void {
    this.isLoading = true;
    this.openingsMap = new Map();

    this.openingService
      .getNextOpenings(this.loadAll)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((result) => {
        result.forEach((o) => {
          const group = o.date.substring(0, 7);
          if (this.openingsMap.has(group)) {
            const old = this.openingsMap.get(group)!;
            old.push(o);
            this.openingsMap.set(group, old);
          } else {
            this.openingsMap.set(group, [o]);
          }
        });
      });
  }

  get canManageOpenings(): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return this.credentialsService.credentials?.canManageOpenings!;
    }
    return false;
  }
}
