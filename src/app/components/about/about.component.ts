import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeTrackingService } from '../../services/time-tracking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  constructor(private timeTrackingService: TimeTrackingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.timeTrackingService.startTracking('about');
  }

  ngOnDestroy(): void {
    const elapsedTime: number = this.timeTrackingService.stopTracking();
    console.log("elapsed time: " + elapsedTime);
    this.authService.updateUserTime('about', elapsedTime);
  }

}
