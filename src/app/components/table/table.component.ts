import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeTrackingService } from '../../services/time-tracking.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription, interval } from 'rxjs';

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
  dynamicTime!: string;
  private startingTime: number = 0;

  constructor(private timeTrackingService: TimeTrackingService, private authService: AuthService) {
    this.user = this.authService.getUserData();
  }

  ngOnInit(): void {
    this.timeTrackingService.startTracking('table');
    this.startingTime = Date.now();
    this.updateDynamicTime();
    this.timeSubscription = interval(1000).subscribe(() => {
      this.updateDynamicTime();
    });
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

  private updateDynamicTime(): void {
    const timeElapsed = ((Date.now() - this.startingTime) + this.user.times.table);
    console.log("Dynamic Time is", timeElapsed)
    this.dynamicTime = this.calculateTrackingTime(timeElapsed);
  }

}
