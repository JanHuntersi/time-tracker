import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeTrackingService } from '../../services/time-tracking.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Observable, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnDestroy {

  user: User = { username: '', times: { home: 0, table: 0, about: 0 } };
  private timeSubscription!: Subscription;
  dynamicTime$: Observable<string> = new Observable<string>();

  constructor(private timeTrackingService: TimeTrackingService, private authService: AuthService) {
    this.user = this.authService.getUserData();
  }

  ngOnInit(): void {
    this.timeTrackingService.startTracking('table');

    this.dynamicTime$ = interval(1000).pipe(
      map(() => this.calculateTrackingTime(this.timeTrackingService.getCurrentTime() + this.user.times.table))
    );
  }

  ngOnDestroy(): void {
    const elapsedTime: number = this.timeTrackingService.stopTracking();
    console.log("elapsed time: " + elapsedTime);
    this.authService.updateUserTime('table', elapsedTime);
  }

  calculateTrackingTime(elapsedTime: number): string {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    return `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
  }

  private formatTimeUnit(unit: number): string {
    return unit < 10 ? `0${unit}` : unit.toString();
  }
}
