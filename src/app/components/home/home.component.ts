import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TimeTrackingService } from '../../services/time-tracking.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private timeTrackingService: TimeTrackingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.timeTrackingService.startTracking('home');
  }

  ngOnDestroy(): void {
    const elapsedTime: number = this.timeTrackingService.stopTracking();
    this.authService.updateUserTime('home', elapsedTime);
  }

  getUserName(): string {
    return this.authService.getUserName() || '';
  }
}
