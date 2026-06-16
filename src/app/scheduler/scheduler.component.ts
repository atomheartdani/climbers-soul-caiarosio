import { KeyValuePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '@app/@shared/loader/loader.component';
import { Opening } from '@app/@shared/models/opening.model';
import { DateWithMonthNamePipe } from '@app/@shared/pipes/dateWithMonthName.pipe';
import { CredentialsService } from '@app/@shared/services/credentials.service';
import { OpeningService } from '@app/@shared/services/opening.service';
import { OpeningDetailDialogComponent } from '@app/opening/opening-detail-dialog/opening-detail-dialog.component';
import { OpeningComponent } from '@app/opening/opening.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  imports: [
    DateWithMonthNamePipe,
    LoaderComponent,
    KeyValuePipe,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    OpeningComponent,
  ],
})
export class SchedulerComponent implements OnInit {
  private dialog = inject(MatDialog);
  private openingService = inject(OpeningService);
  private credentialsService = inject(CredentialsService);

  openingsMap = signal<Map<string, Opening[]>>(new Map());
  isLoading = signal<boolean>(true);
  loadAll: boolean = false;

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
    this.isLoading.set(true);

    this.openingService
      .getNextOpenings(this.loadAll)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((result) => {
        const newMap = new Map<string, Opening[]>();

        result.forEach((o) => {
          const group = o.date.substring(0, 7);

          const openings = newMap.get(group) ?? [];
          openings.push(o);

          newMap.set(group, openings);

          /*if (this.openingsMap().has(group)) {
            const old = this.openingsMap().get(group)!;
            old.push(o);
            this.openingsMap().set(group, old);
          } else {
            this.openingsMap().set(group, [o]);
          }*/
        });
        this.openingsMap.set(newMap);
      });
  }

  get canManageOpenings(): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return this.credentialsService.credentials?.canManageOpenings!;
    }
    return false;
  }
}
