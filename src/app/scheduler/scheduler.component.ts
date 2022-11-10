import { Component, OnInit } from '@angular/core';
import { Opening } from '@app/@shared/models/opening.model';
import { OpeningService } from '@app/@shared/services/opening.service';
import { ReservationService } from '@app/@shared/services/reservation.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  openings: Opening[] = [];
  reservationsMap: Map<number, number> = new Map();
  isLoading: boolean = true;

  constructor(private openingService: OpeningService, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.openingService.getOpenings().subscribe((result) => {
      this.openings = result;
      this.reservationsMap = new Map(result.map((i) => [i.id, 0]));

      this.reservationService.getReservations().subscribe((result) => {
        result.forEach((r) => {
          this.reservationsMap.set(r.opening_id, this.reservationsMap.get(r.opening_id)! + 1);
        });
        this.isLoading = false;
      });
    });
  }
}
