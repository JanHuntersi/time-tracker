import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeTrackingService } from '../../services/time-tracking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnDestroy {
  constructor(private timeTrackingService: TimeTrackingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.timeTrackingService.startTracking('table');
  }

  ngOnDestroy(): void {
    const elapsedTime: number = this.timeTrackingService.stopTracking();
    console.log("elapsed time: " + elapsedTime);
    this.authService.updateUserTime('table', elapsedTime);
  }
}
