import { Component, OnInit } from '@angular/core';
import { Opening } from '@app/@shared/models/opening.model';
import { OpeningService } from '@app/@shared/services/opening.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  openingsMap: Map<string, Opening[]> = new Map();
  isLoading: boolean = true;

  constructor(private openingService: OpeningService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.isLoading = true;
    this.openingsMap = new Map();

    this.openingService.getOpenings().subscribe((result) => {
      result.forEach((o) => {
        let group = o.date.substring(0, 7);
        if (this.openingsMap.has(group)) {
          let old = this.openingsMap.get(group)!;
          old.push(o);
          this.openingsMap.set(group, old);
        } else {
          this.openingsMap.set(group, [o]);
        }
      });

      this.isLoading = false;
    });
  }
}
